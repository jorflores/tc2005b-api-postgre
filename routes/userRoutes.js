const express = require('express');
const router = express.Router();
const { createUser, loginUser, getAllUsers, getUserData,deleteUser } = require('../controllers/userController');
const {logTime,verifyToken} = require("../middleware/verify");
const { verify } = require('jsonwebtoken');

router.post('/signup', createUser);
router.post('/login',logTime('Login-Attempt'),loginUser);

router.get('/getAllUsers',verifyToken,   getAllUsers )
router.get('/getUserData', verifyToken,  getUserData )
router.delete('/deleteUser/:id', verifyToken, deleteUser)

module.exports = router;
