const express = require('express');
const router = express.Router();
const initializePayment = require('../controllers/controllers'); 


router.post('/acceptpayment', initializePayment.acceptPayment);
router.get('/verify', initializePayment.verifyPayment);
router.get('/test', initializePayment.testApi);
module.exports = router