const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
const auth= require('./../middleware/auth');
const AuthController = require('../controller/authController');

router.get('/home', AuthController.home);
router.post('/u/register', AuthController.register);
router.post('/u/login', AuthController.login);
router.get('/u/profile',auth,AuthController.profile);
module.exports = router;