const express = require('express');
const router = express.Router();
const { createUser, loginUser, getAllUsers, getUserData } = require('../controllers/userController');
const {logTime,verifyToken} = require("../middleware/verify")

router.post('/signup', createUser);
router.post('/login',logTime('Login-Attempt'),loginUser);
router.get('/getAllUsers',verifyToken,   getAllUsers )
router.get('/getUserData',verifyToken,   getUserData )

module.exports = router;
