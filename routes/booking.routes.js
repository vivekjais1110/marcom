const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const authenticate = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

router.use(authenticate);

router.post(
    '/bookSlot',
    [
      body('slot_id').notEmpty().withMessage('slot_id is required'),
    ],
    bookingController.bookSlot
  );

router.get("/getTrainerBookings", bookingController.getTrainerBookings);

module.exports = router;