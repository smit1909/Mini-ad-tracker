const { Pool } = require('pg');
const { newDb } = require('pg-mem');
const fs = require('fs');
const path = require('path');
const logger = require('../src/utils/logger');
require('dotenv').config();

let dbInstance;

/**
 * Creates an in-memory database replication of Postgres
 * Perfect for when Docker/Cloud DB is unavailable.
 */
const createMemoryDb = () => {
  logger.warn('⚠️  DATABASE CONNECTION FAILED or MISSING URL ⚠️');
  logger.warn('➜ Switched to IN-MEMORY DATABASE (pg-mem).');
  logger.warn('➜ Data will be lost when server restarts.');

  const memDb = newDb();

  // Mock UUID extension
  memDb.public.registerFunction({
    name: 'uuid_generate_v4',
    returns: memDb.public.getType('uuid'),
    implementation: () => 'uuid-' + Math.random().toString(36).substr(2, 9),
  });

  // We can registers other pg specific functions here if needed

  // Initialize Schema
  try {
    // Look for schema in src/scripts/schema.sql (new location) or root schema.sql (fallback)
    let schemaPath = path.join(__dirname, '..', 'src', 'scripts', 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      schemaPath = path.join(__dirname, '..', 'schema.sql');
    }

    if (fs.existsSync(schemaPath)) {
      let schemaSql = fs.readFileSync(schemaPath, 'utf8');
      // Remove CREATE EXTENSION as we mock it
      schemaSql = schemaSql.replace(/CREATE EXTENSION.*;/gi, '');
      memDb.public.none(schemaSql);
      logger.info('In-Memory Schema initialized successfully.');
    } else {
      logger.error('Schema file not found. In-Memory DB is empty.');
    }
  } catch (e) {
    logger.error('Failed to initialize in-memory schema:', e);
  }

  // Create adapter to match 'pg' library pool interface
  const adapter = memDb.adapters.createPg();

  return {
    query: (text, params) => adapter.query(text, params),
    pool: {
      end: () => Promise.resolve(),
      on: () => { },
      connect: () => Promise.resolve({ release: () => { } }) // Mock connect
    }
  };
};

const initDB = () => {
  const dbUrl = process.env.DATABASE_URL;

  // 1. If no URL or placeholder, strict fallback
  if (!dbUrl || dbUrl.includes('postgres:password') || dbUrl.includes('user:password')) {
    return createMemoryDb();
  }

  // 2. Try Real Connection
  const poolConfig = {
    connectionString: dbUrl,
    ssl: dbUrl.includes('localhost') ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  };

  const pool = new Pool(poolConfig);

  // We purposely don't await this check. The pool will emit 'error' if it fails.
  // But to seamlessly fallback, we might want to wrap pool.query.
  // For simplicity in this architecture: 
  // We return the real pool. If it errors, we rely on the user fixing env or using the in-memory fallback by clearing env.

  pool.on('error', (err) => {
    logger.error('Unexpected DB Error', err);
  });

  return {
    query: (text, params) => pool.query(text, params),
    pool
  };
};

module.exports = initDB();
