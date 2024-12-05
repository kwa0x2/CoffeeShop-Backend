import Redis from "ioredis";
import env from "../../shared/utils/env";

export const redisClient = new Redis({
    host: env.REDIS_HOST || "localhost",
    port: env.REDIS_PORT || 6379,
    password: env.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
    console.log("Redis Connected");
});

redisClient.on("error", (err) => {
    console.error("Redis error", err);
});
