const express = require('express');
const conversionController = require('../controllers/conversionController');

const router = express.Router();

router.post('/conversion', conversionController.trackConversion);

module.exports = router;
