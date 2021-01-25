const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const userControl = require('../controllers/users');

router.post('', wrapAsync(userControl.newUser));

router.put('', wrapAsync(userControl.editUser));

router.put('/update-ratings', wrapAsync(userControl.updateRatings));

router.get('/confirmation/:id', wrapAsync(userControl.confirmEmail));

router.post('/forgotpassword', wrapAsync(userControl.sendForgotPasswordCode));

router.get('/reset/:code', wrapAsync(userControl.verifyForgotPasswordCode));

router.put('/updatepassword', wrapAsync(userControl.saveNewPassword));

router.get('/:id', wrapAsync(userControl.getUserInfo));

module.exports = router;
