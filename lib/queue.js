const Queue = require('bull');

const taskQueue = new Queue('tasks', {
  redis: process.env.REDIS_URL
});

module.exports = {
  taskQueue
};
