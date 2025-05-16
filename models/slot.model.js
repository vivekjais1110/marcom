const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbSQL');
const User = require('../models/userSQL');
const Wallet = require('../models/wallet.model');

const Slot = sequelize.define('slot', {

    slot_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
    trainer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    date_time: {
       type: DataTypes.DATE 
      },
    is_booked: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    }
  });


  User.hasMany(Slot, { foreignKey: 'trainer_id' , as : 'trainer'});
  Slot.belongsTo(User, { foreignKey: 'trainer_id' , as : 'trainer'});



module.exports = Slot;