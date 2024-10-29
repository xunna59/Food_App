const express = require('express');
const { body, param } = require('express-validator');
const orderController = require('../controllers/orderController');
const router = express.Router();


const orderValidationRules = [
    body('userId')
        .notEmpty()
        .withMessage('User ID is required'),
    body('amount')
        .notEmpty()
        .withMessage('Amount is required'),
    body('status')
        .notEmpty()
        .withMessage('Status is required'),
];

const orderIdValidationRule = [
    param('id')
        .isInt()
        .withMessage('ID must be an integer'),
];


router.post('/', orderValidationRules, orderController.createOrder);
router.get('/', orderController.getOrders);
router.delete('/:id', orderIdValidationRule, orderController.deleteOrder);
router.patch('/:id', orderController.cancelOrder);
router.get('/end-of-day-report', orderController.getEndOfDayReport);

module.exports = router;
