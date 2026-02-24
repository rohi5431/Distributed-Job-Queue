require("dotenv").config();
const IORedis = require("ioredis");

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

connection.on("connect", () => {
  console.log("✅ Connected to Redis Cloud");
});

connection.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

module.exports = connection;