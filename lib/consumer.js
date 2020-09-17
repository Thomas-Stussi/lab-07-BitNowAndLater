const { taskQueue, notifyQueue } = require('./queue');

taskQueue.process(5, `${__dirname}/compare-worker.js`);

taskQueue.on('completed', job => {
  notifyQueue.add(job.returnvalue);
});

notifyQueue.process(5, `${__dirname}/notify-worker.js`);


