
const User = require('../models/userSQL');
const Wallet = require('../models/wallet.model');


exports.topUpWallet = async (req, res) => {
  try {
    const { amount } = req.body;    
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Please provide a valid top-up amount" });
    }

    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    // Add amount to existing balance
    wallet.balance += Number(amount);
    await wallet.save();

    return res.status(200).json({
      message: "Wallet topped up successfully",
      balance: wallet.balance
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getWalletBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    const wallet = await Wallet.findOne({ where: { userId } });

    if (!wallet) {
      return res.status(404).json({
        message: "Wallet not found.",
      });
    }

    return res.status(200).json({
      message: "Wallet balance fetched successfully.",
      balance: wallet.balance,
    });

  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return res.status(500).json({
      message: "An error occurred while fetching wallet balance.",
      error: error.message,
    });
  }
};