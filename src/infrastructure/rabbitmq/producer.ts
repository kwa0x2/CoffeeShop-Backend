import {createRabbit} from "./connection";

export const sendToQueue = async (queueName: string, message: any) => {
    const connection = await createRabbit();
    if (!connection) throw new Error("RabbitMQ connection failed");

    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });

    console.log(`Message sent to queue ${queueName}`);
};
