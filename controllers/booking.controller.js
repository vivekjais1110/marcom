
const Slot = require('../models/slot.model');
const User = require('../models/userSQL');
const Wallet = require('../models/wallet.model');
const Booking = require('../models/booking.model');
const transport = require("../middlewares/nodemailer");

exports.bookSlot = async (req, res) => {
  try {
    const memberId = req.user.id;
    const { slot_id } = req.body;

   
    const member = await User.findOne({ where: { id: memberId } });
    if (!member || member.role !== 'member') {
      return res.status(403).json({ message: "Only members can book slots." });
    }

    const wallet = await Wallet.findOne({ where: { userId: memberId } });
    if (!wallet || wallet.balance < 200) {
      return res.status(400).json({ message: "Insufficient wallet balance. ₹200 required." });
    }

    const slot = await Slot.findOne({ where: { slot_id } });
    if (!slot) {
      return res.status(404).json({ message: "Slot not found." });
    }

    if (slot.is_booked) {
      return res.status(400).json({ message: "Slot is already booked." });
    }


    wallet.balance -= 200;
    await wallet.save();

 
    slot.is_booked = true;
    await slot.save();

  
    const booking = await Booking.create({
      slot_id: slot.slot_id,
      member_id: memberId,
      trainer_id: slot.trainer_id
    });

      if (member.email) {

        await transport.mailsend({
          from: 'ayushjaiswal7081@gmail.com',
          to: member.email,
          subject: `Notification: Mini Wellness Booking System`,
          html: `
            <p>Dear ${member.name},</p>

            <p>Your session with trainer ${slot.trainer_id} is confirmed for ${slot.date_time}.</p>

            <p>Thank you!</p>
          `,
        });
        console.log(`Email sent to ${member.email}`);
      }

    return res.status(200).json({
      message: "Slot booked successfully!",
      booking
    });

  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getTrainerBookings = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const bookings = await Booking.findAll({
      where: { trainer_id: trainerId },
      include: [
        {
          model: Slot
        },
        {
          model: User,
          as: 'member',  
          attributes: ['id', 'name', 'email','role']
        }
      ]
    });

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({
        message: "No bookings found for this trainer.",
        data: []
      });
    }

    return res.status(200).json({
      message: "Bookings fetched successfully.",
      data: bookings
    });

  } catch (error) {
    console.error("Error fetching trainer bookings:", error.message);
    return res.status(500).json({
      message: "An error occurred while fetching bookings.",
      error: error.message
    });
  }
};