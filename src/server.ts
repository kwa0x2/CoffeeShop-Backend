import express, { NextFunction, Request, Response } from "express";
import { connecToDatabase } from "./infrastructure/database/mongoose";
import authRoutes from "./interfaces/routes/auth.routes";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import env from "./shared/utils/env";
import productRoutes from "./interfaces/routes/product.routes";
import {redisSession} from "./infrastructure/third-party/redis";
import basketRoutes from "./interfaces/routes/basket.routes";
import {Consumer} from "./infrastructure/rabbitmq/consumer";

const app = express();
const port = env.PORT;

app.use(express.json());
app.use(morgan("dev"));

connecToDatabase();

app.use(redisSession);

app.get("/", (req: Request, res: Response) => {
    res.send("server is running - kwa");
});

const consumer = new Consumer();
consumer
    .consumeQueue("order")
    .then(() => console.log("RabbitMQ consumer started successfully"))
    .catch((err) => console.error("Error starting RabbitMQ consumer:", err));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/basket", basketRoutes);

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
