const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Op } = require('sequelize');
const sequelize = require('./config/dbSQL');
const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/wallet.routes');
const slotRoutes = require('./routes/slot.routes');
const bookingRoutes = require('./routes/booking.routes');

const errorHandler = require('./middlewares/errorHandler');


const cron = require('node-cron');
const moment = require('moment');
const transport = require("./middlewares/nodemailer");
const User = require('./models/userSQL');
const Wallet = require('./models/wallet.model');
const Slot = require('./models/slot.model');
const Booking = require('./models/booking.model');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/v1', userRoutes);

app.use("/api/v1", walletRoutes);
app.use("/api/v1", slotRoutes);
app.use("/api/v1", bookingRoutes);

app.use(errorHandler);

//Databases

sequelize.sync()
  .then(() => console.log('Connected to SQL Database'))
  .catch((error) => console.error('SQL Database connection error:', error));

//Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// 30 sec '*/30 * * * * *'
// 30 minute '*/30 * * * *'
// 24 h '0 0 * * *'
// 10 AM '0 10 * * *'
// 3 PM'0 15 * * *'



cron.schedule('0 10 * * *', async () => {
  try {
    console.log('Cron: Checking for slot deadlines...');

    const today = moment().startOf('day').toDate();
    const threeDaysLater = moment().add(3, 'days').endOf('day').toDate();

    const slots = await Slot.findAll({
      where: {
        date_time: {
          [Op.gte]: today,
          [Op.lte]: threeDaysLater,
        },
      },
    });

    if (!slots.length) {
      console.log('No slots nearing deadline.');
      return;
    }

    const trainerIds = [...new Set(slots.map(s => s.trainer_id))];
    const users = await User.findAll({ where: { id: trainerIds } });

    for (const user of users) {
      if (user.email) {
        await transport.mailsend({
          from: 'ayushjaiswal7081@gmail.com',
          to: user.email,
          subject: `Reminder: Slot Deadline Nearing (3 days left)`,
          html: `
            <p>Dear ${user.name || 'Trainer'},</p>
            <p>You have a slot scheduled within the next 3 days. Please be reminded.</p>
            <p>Regards,<br>Wellness Team</p>
          `,
        });
        console.log(`Email sent to ${user.email}`);
      }
    }

    console.log('Slot deadline reminders completed.');
  } catch (error) {
    console.error('Cron Error:', error);
  }
});