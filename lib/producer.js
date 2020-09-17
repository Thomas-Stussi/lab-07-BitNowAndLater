const { taskQueue } = require('./queue');

setInterval(() => (taskQueue.add()), 5000);
