const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbSQL');

const User = require('./userSQL');
const Slot = require('./slot.model');

const Booking = sequelize.define('booking', {
  booking_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  slot_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trainer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});


Booking.belongsTo(Slot, { foreignKey: 'slot_id' });

Booking.belongsTo(User, { foreignKey: 'member_id', as: 'member' });

Booking.belongsTo(User, { foreignKey: 'trainer_id', as: 'trainer' });



module.exports = Booking;