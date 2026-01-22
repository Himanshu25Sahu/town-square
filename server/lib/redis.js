import { Redis as UpstashRedis } from "@upstash/redis";
import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redis;


if (process.env.NODE_ENV === "production") {
  // Production
  redis = new UpstashRedis({
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REDIS_TOKEN,
  });
  console.log("Redis: Using Upstash (Production)");
} else {

  redis = new IORedis(process.env.LOCAL_REDIS_URL || "redis://127.0.0.1:6379");
  
  redis.on("connect", () => console.log("Redis: Connected to local Windows server"));
  redis.on("error", (err) => console.error("Redis Local Error:", err));
}

export default redis;