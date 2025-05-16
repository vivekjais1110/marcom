const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSQL');
const Wallet = require('../models/wallet.model');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const user_duplicate = await User.findOne({ 
      where: { email:email } 
    });
    if (user_duplicate) return res.status(404).json({ message: 'Already Exists' });

    const user = await User.create({
      name:name,
      email:email,
      password: hashed_password ,
      role:role
    });
    await Wallet.create({ userId:user.id }); // Wallet create KR RHE FOR 0 balance

    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = await User.findOne({
       where: { email:email } 
      });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const is_match = await bcrypt.compare(password, user.password);
    if (!is_match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); //ek ghante
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
