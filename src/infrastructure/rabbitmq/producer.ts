import {createRabbit} from "./connection";
import createHttpError from "http-errors";

export const sendToQueue = async (queueName: string, message: any) => {
    try {
        const connection = await createRabbit();
        if (!connection) throw createHttpError(500, "Failed to connect to RabbitMQ");

        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });

        console.log(`Message sent to queue ${queueName}`);
    } catch (error) {
        console.error("Error sending message to RabbitMQ queue:", error);
        throw createHttpError(500, "Failed to send message to the queue.");
    }
};
