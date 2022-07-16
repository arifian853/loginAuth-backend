const express = require('express');
const router = express.Router();
const { UserRegist, UserLogin, getSingleUser } = require('../controller/user.controller');
const { runValidation, validationRegister, validationLogin } = require('../validation');
const middleware = require('../middleware/middleware');

router.post('/register' , validationRegister, runValidation, UserRegist);
router.post('/login', validationLogin, runValidation, UserLogin);
router.get('/user', middleware, getSingleUser);

module.exports = router