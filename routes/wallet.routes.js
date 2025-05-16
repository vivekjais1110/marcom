
const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const authenticate = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

router.use(authenticate);

router.post(
    '/topUpWallet',
    [
      body('amount').notEmpty().withMessage('Amount is required'),
    ],
    walletController.topUpWallet
  );

router.get('/getWalletBalance', walletController.getWalletBalance);

  

module.exports = router;