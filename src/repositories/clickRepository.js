const db = require('../../config/db');
const logger = require('../utils/logger');

class ClickRepository {
    async create(clickData) {
        const { click_id, source, campaign_id, ad_id, ip, user_agent } = clickData;
        const query = `
            INSERT INTO clicks (click_id, source, campaign_id, ad_id, ip, user_agent) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [click_id, source, campaign_id, ad_id, ip, user_agent];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            logger.error('Error creating click record:', error);
            throw error;
        }
    }

    async findById(click_id) {
        const query = `SELECT * FROM clicks WHERE click_id = $1`;
        const result = await db.query(query, [click_id]);
        return result.rows[0];
    }

    // Additional methods for reporting if needed
    async getReportData(source) {
        // First check if table exists to give a better error message
        try {
            await db.query('SELECT 1 FROM clicks LIMIT 1');
        } catch (err) {
            if (err.code === '42P01') { // undefined_table
                throw new Error("Database tables not found. Did you run 'node migrate.js'?");
            }
            throw err;
        }

        let query = `
            SELECT 
                c.campaign_id,
                COUNT(DISTINCT c.click_id) as total_clicks,
                COUNT(DISTINCT conv.id) as total_conversions,
                COALESCE(SUM(conv.value), 0) as total_revenue
            FROM clicks c
            LEFT JOIN conversions conv ON c.click_id = conv.click_id
        `;

        const params = [];
        if (source) {
            query += ` WHERE c.source = $1`;
            params.push(source);
        }

        query += ` GROUP BY c.campaign_id`;

        const result = await db.query(query, params);
        return result.rows;
    }
}

module.exports = new ClickRepository();
