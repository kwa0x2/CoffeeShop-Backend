import session from "express-session";
import env from "../../shared/utils/env";
import {RedisStore} from "connect-redis";
import {redisClient} from "./client";

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
