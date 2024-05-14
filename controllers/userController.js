const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign({id: user.id, phone: user.phone}, process.env.SECRET, {expiresIn: "1h"})

        // Set the token in an HTTP-only cookie
        res.cookie('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
          sameSite: 'strict', // Protects against CSRF attacks
          maxAge: 3600000 // 1 hour in milliseconds
        });


    res.json({ message: 'Login successful'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





exports.createUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ where: { phone: phone } });
    if (!user) {

      const newUser = await User.create({ phone, password });

      const token = jwt.sign({id: newUser.id, phone: newUser.phone}, process.env.SECRET, {expiresIn: "1h"})

      // Set the token in an HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
        sameSite: 'strict', // Protects against CSRF attacks
        maxAge: 3600000 // 1 hour in milliseconds
      });


      res.status(201).json({ message: 'Register successful', token: token });
    }
    else {
      return res.status(401).json({ message: 'User already exists, code 1' });
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {

    const token = req.cookies.authToken; 
    console.log(token)

    const users = await User.findAll();
    if (!users) {
      res.status(201).json({ message: 'No existen usuarios registrados' });
    }
    else {
      return res.status(201).json({users});
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


