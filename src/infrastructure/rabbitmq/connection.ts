import amqplib from "amqplib";
import env from "../../shared/utils/env";

let rabbitConnection: amqplib.Connection | null = null;

export const createRabbit = async () => {
    if (rabbitConnection) return rabbitConnection;

    try {
        rabbitConnection = await amqplib.connect(env.RABBITMQ_URI);
        console.log("RabbitMQ connected");
        return rabbitConnection;
    } catch (error) {
        console.error("RabbitMQ connection error:", error);
        return null;
    }
};
