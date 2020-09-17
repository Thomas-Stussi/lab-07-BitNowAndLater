const { taskQueue } = require('./queue');
const pool = require('./utils/pool');




setInterval(async() => {
  const { rows } = await pool.query('SELECT id FROM users');
  return rows.map(row => {
    taskQueue.add({ rowId: row.id });
  });
}, 5000);
