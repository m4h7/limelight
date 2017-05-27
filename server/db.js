import pg from 'pg';

/**
 * PG connection pool configuration
 */
const pgPoolConfig = {
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

/**
 * Create a database connection pool
 *
 * @return {Object} pool
 */
export function dbConnect() {
  const pool = new pg.Pool(pgPoolConfig);
  return pool;
}
