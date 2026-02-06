const fs = require('fs');
const path = require('path');
const db = require('../../config/db');
const logger = require('../../src/utils/logger');

async function migrate() {
  // If we are using in-memory DB, the schema is already loaded in config/db.js
  // We can skip this or just run it safely. 
  // pg-mem adapter.query supports this.

  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      logger.error(`Schema file not found at ${schemaPath}`);
      return;
    }
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    logger.info('Running migration...');

    // We wrap this in try-catch because if tables exist, it might fail if we don't have IF NOT EXISTS
    // But our schema has IF NOT EXISTS.
    await db.query(schemaSql);

    logger.info('Migration completed successfully.');
  } catch (err) {
    if (err.message && err.message.includes('already exists')) {
      logger.info('Tables already exist.');
    } else {
      logger.error('Migration failed:', err);
      // Don't exit process with 1, just log it. 
      // We want the server to try starting anyway (especially in memory mode)
    }
  } finally {
    // Don't close the pool if we are being required by server.js start script
    // actually the start script is "node migrate && node server" so we MUST close it.
    // BUT if it's in-memory, closing it wipes data? 
    // pg-mem pool.end() is a no-op in my implementation above. 
    // For real DB, we need to close to let the process exit so '&& node server' runs.
    if (db.pool && typeof db.pool.end === 'function') {
      await db.pool.end();
    }
  }
}

migrate();
