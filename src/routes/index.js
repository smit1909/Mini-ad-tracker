const express = require('express');
const trackingRoutes = require('./trackingRoutes');
const conversionRoutes = require('./conversionRoutes');
const reportRoutes = require('./reportRoutes');

const router = express.Router();

// Mount routes
// Note: original app had /click, /conversion, /report at root level.
router.use('/', trackingRoutes);
router.use('/', conversionRoutes);
router.use('/', reportRoutes);

module.exports = router;
