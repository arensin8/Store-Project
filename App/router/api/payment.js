const { PaymentController } = require('../../http/controllers/api/payment.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();
router.post('/payment' , verifyAccessToken , PaymentController.PaymentGateway)
router.post('/verify' , () => {})
module.exports = {
    ApiPayment : router
}

// 1. payment
// 2. checkTransaction
// 2. verifyTransaction
// --------------------
//1. payment
//2. verify