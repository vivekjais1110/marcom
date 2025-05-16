const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slot.controller');
const authenticate = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

router.use(authenticate);

router.post(
    '/addSlot', //role("trainer"),
    [
      body('date_time').notEmpty().withMessage('Date-Time is required'),
    ],
    slotController.addSlot
  );

router.get("/getAvailableSlots", slotController.getAvailableSlots);

router.get('/getAvailableslots_pagination', slotController.getAvailableslots_pagination);

module.exports = router;