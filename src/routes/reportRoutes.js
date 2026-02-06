const express = require('express');
const reportController = require('../controllers/reportController');

const router = express.Router();

router.get('/report', reportController.getReport);

module.exports = router;
