const express = require('express');
const router = express.Router();
const { createUser, loginUser, getAllUsers } = require('../controllers/userController');
const {logTime,verifyToken} = require("../middleware/verify")

router.post('/signup', createUser);
router.post('/login',logTime('Login-Attempt'),loginUser);
router.get('/getAllUsers',verifyToken,   getAllUsers )

module.exports = router;
