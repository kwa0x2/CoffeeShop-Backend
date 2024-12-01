import express, { NextFunction, Request, Response } from "express";
import { connecToDatabase } from "./infrastructure/database/mongoose";
import authRoutes from "./interfaces/routes/auth.routes";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import env from "./shared/utils/env";
import Redis from "ioredis";
import session from "express-session";
import {RedisStore} from "connect-redis"

const app = express();
const port = env.PORT;

app.use(express.json());
app.use(morgan("dev"));

connecToDatabase();

export const redisClient = new Redis({
    host: "localhost",
    port: 6379,
    password: "kwasecpass",
});

app.use(
    session({
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
    })
);

app.get("/", (req: Request, res: Response) => {
    res.send("server is running - kwa");
});

app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

app.use(
    (error: unknown, req: Request, res: Response, next: NextFunction) => {
        console.log(error);
        let errorMessage = "An unknown error occurred";
        let statusCode = 500;
        if (isHttpError(error)) {
            statusCode = error.status;
            errorMessage = error.message;
        }
        res.status(statusCode).json({ error: errorMessage });
    }
);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
