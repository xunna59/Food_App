const express = require('express');
const { body, param } = require('express-validator');
const userController = require('../controllers/userController');
const router = express.Router();


const userValidationRules = [
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('email')
        .notEmpty()
        .withMessage('Email is required'),
];


const userIdValidationRule = [
    param('id')
        .isInt()
        .withMessage('ID must be an integer'),
];


router.post('/', userValidationRules, userController.createUser);
router.get('/', userController.getUsers);
router.delete('/:id', userIdValidationRule, userController.deleteUser);

module.exports = router;
