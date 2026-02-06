const db = require('../../config/db');
const logger = require('../utils/logger');

class ConversionRepository {
    async create(conversionData) {
        const { click_id, event, value, currency } = conversionData;
        const query = `
            INSERT INTO conversions (click_id, event, value, currency) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        const values = [click_id, event, value, currency];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            logger.error('Error creating conversion record:', error);
            throw error;
        }
    }
}

module.exports = new ConversionRepository();
