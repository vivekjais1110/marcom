const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbSQL');
const User = require('../models/userSQL');

const Wallet = sequelize.define('wallet', {

    wallet_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
    balance: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  });


  
  User.hasOne(Wallet, { foreignKey: 'userId' });
  Wallet.belongsTo(User, { foreignKey: 'userId' });
  

module.exports = Wallet;