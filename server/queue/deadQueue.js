const { Queue } = require("bullmq");
const connection = require("../config/redis");

const deadQueue = new Queue("dead-queue", {
  connection,
});

module.exports = deadQueue;