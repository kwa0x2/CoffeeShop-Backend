import Redis from "ioredis";
import session from "express-session";
import {RedisStore} from "connect-redis"
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

export const redisSession = session({
    name: env.COOKIE_NAME,
    store: new RedisStore({
        client: redisClient,
        disableTouch: true,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
        secure: false,
    },
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
});
