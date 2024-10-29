const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/db_config');
const errorHandler = require('./src/middleware/errorHandler');
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();


app.use(bodyParser.json());
app.use(express.json());


app.use('/users', userRoutes);
app.use('/orders', orderRoutes);


app.use(errorHandler);


const start = async () => {
    try {
        await sequelize.sync();
        console.log("Database synced successfully.");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

        process.on('SIGINT', () => {
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

        process.on('SIGTERM', () => {
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error("Unable to sync database:", error);
    }
};

start();
