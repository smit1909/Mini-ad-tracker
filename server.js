const express = require('express');
const cors = require('cors');
require('dotenv').config();

const globalErrorHandler = require('./src/middlewares/errorHandler');
const routes = require('./src/routes');
const logger = require('./src/utils/logger');
const AppError = require('./src/utils/AppError');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Global Middleware
app.use(cors());
app.use(express.json());

// Request Logger Middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/', routes);

// Base route check
app.get('/', (req, res) => {
    res.send('Ad Tracker Backend Running (Refactored)');
});

// 404 Handler - Express 5 requires regex or generic middleware for fallbacks
app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
const server = app.listen(PORT, () => {
    logger.info(`Backend server running on port ${PORT}`);
});

// Handle Unhandled Rejections (e.g. DB connection fail outside of requests)
process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    logger.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
