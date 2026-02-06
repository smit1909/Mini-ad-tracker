const db = require('../../config/db');
const logger = require('../utils/logger');

// This script now relies on the centralized logic in config/db.js
// which already includes the DNS workaround/SNI logic.

(async () => {
    try {
        logger.info('Testing database connection (with DNS fix logic in config)...');
        const res = await db.query('SELECT NOW() as now');
        logger.info('Connection successful! Time:', res.rows[0]);
    } catch (err) {
        logger.error('Connection failed:', err);
    } finally {
        await db.pool.end();
    }
})();
