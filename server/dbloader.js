import DataLoader from 'dataloader';
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

var recordLoader = new DataLoader(
  ids => ids.map(id => id + 1)
);

function getRecords() {
  return [
    Promise.resolve({id: 1, title: 'hello world'}),
    Promise.resolve({id: 2, title: 'hello world2'}),
  ];
}

var recordsLoader = new DataLoader(keys =>
  Promise.all(keys.map(_ => getRecords()))
);

export {
  recordLoader,
  recordsLoader,
};
