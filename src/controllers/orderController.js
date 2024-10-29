const Order = require('../models/Order');
const { validationResult } = require('express-validator');
const sequelize = require('../config/db_config');
const orderController = {
    createOrder: async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { userId, amount, status } = req.body;
            const order = await Order.create({ userId, amount, status });
            res.status(201).json({ success: true, message: "Order created successfully", order });
        } catch (error) {
            next(error);
        }
    },

    getOrders: async (req, res, next) => {
        try {
            const orders = await Order.findAll();
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    },

    deleteOrder: async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { id } = req.params;
            const order = await Order.destroy({ where: { id } });
            if (!order) return res.status(404).send("Order not found");
            res.status(201).json({ success: true, message: "Order Deleted successfully" });
        } catch (error) {
            next(error);
        }
    },

    cancelOrder: async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id);
            if (!order) return res.status(404).send("Order not found");
            order.status = 'canceled';
            await order.save();
            res.status(200).json({ success: true, message: "Order Canceled successfully", order });
        } catch (error) {
            next(error);
        }
    },

    getEndOfDayReport: async (req, res, next) => {
        try {
            const report = await Order.findOne({
                attributes: [
                    [sequelize.fn('SUM', sequelize.col('amount')), 'totalOrderAmount'],
                    [sequelize.fn('COUNT', sequelize.col('id')), 'totalOrders'],
                ],
                where: sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), new Date().toISOString().slice(0, 10)),
            });
            res.status(200).json(report);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = orderController;
