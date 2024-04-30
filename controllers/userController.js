const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ where: { phone: phone } });
    if (!user) {
      const newUser = await User.create({ phone, password });
      res.status(201).json({ message: 'Register successful', token: '1234ABCD' });
    }
    else {
      return res.status(401).json({ message: 'User already exists, code 1' });
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ where: { phone: phone } });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed, code 4' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    res.json({ message: 'Login successful', token: '1234ABCD' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
