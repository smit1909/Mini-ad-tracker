const db = require('../../config/db');
const logger = require('../utils/logger');

(async () => {
    try {
        logger.info('Testing database connection...');
        const res = await db.query('SELECT NOW()');
        logger.info('Connection successful! Current Database Time:', res.rows[0]);
    } catch (err) {
        logger.error('Connection failed:', err);
    } finally {
        // End the pool to allow the script to exit
        await db.pool.end();
    }
})();
