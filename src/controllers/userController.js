const User = require('../models/User');
const { validationResult } = require('express-validator');

const userController = {
    createUser: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email } = req.body;
            const user = await User.create({ name, email });
            res.status(201).json({ success: true, message: "User created successfully", user });
        } catch (error) {
            next(error);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { id } = req.params;
            const user = await User.destroy({ where: { id } });
            if (!user) return res.status(404).send("User not found");
            res.status(201).json({ success: true, message: "User Deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = userController;
