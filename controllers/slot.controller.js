
const User = require('../models/userSQL');
const Wallet = require('../models/wallet.model');
const Slot = require('../models/slot.model');
const { validationResult } = require('express-validator');

exports.addSlot = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  try {
    const { date_time } = req.body;
    const trainerId = req.user.id;
    const existingUser = await User.findOne({ where: { id : trainerId} });

    const role = existingUser.role; 

    if (role !== 'trainer') {
      return res.status(403).json({
        message: `Your role is '${role}'. Only trainers are allowed to add slots.`
      });
    }

    const slot = await Slot.create({ date_time, trainer_id: trainerId });

    return res.status(201).json({ message: "Slot added", slot });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await Slot.findAll({
      where: { is_booked: false },
      include: [
        {
          model: User,
          as: 'trainer',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

   
    if (!slots || slots.length === 0) {
      return res.status(200).json({
        message: "No available slots found.",
        data: []
      });
    }


    return res.status(200).json({
      message: "Available slots fetched successfully.",
      data: slots
    });

  } catch (error) {
    console.error("Error fetching available slots:", error.message);
    return res.status(500).json({
      message: "An error occurred while fetching available slots.",
      error: error.message
    });
  }
};


  exports.getAvailableslots_pagination = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const slots = await Slot.findAll({
        where: { is_booked: false },
        include: [
          {
            model: User,
            as: 'trainer',
            attributes: ['id', 'name', 'email']
          }
        ],
        offset: (page - 1) * limit,
        limit: limit,
      });
  
      if (!slots || slots.length === 0) {
        return res.status(200).json({
          message: "No available slots found.",
          data: []
        });
      }
  

      return res.status(200).json({
        message: "Available slots fetched successfully.",
        data: slots
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };