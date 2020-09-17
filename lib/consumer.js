const { taskQueue, notifyQueue } = require('./queue');

taskQueue.process(5, `${__dirname}/compare-worker.js`);

taskQueue.on('completed', job => {
  job.returnvalue &&
  notifyQueue.add(job.returnvalue);
});

notifyQueue.process(5, `${__dirname}/notify-worker.js`);
