import amqplib from "amqplib"
import env from "../../shared/utils/env";

export default function createRabbit() {
    try {
        return amqplib.connect(env.RABBITMQ_URI);
    } catch (error) {
        console.error(error);
        return process.exit(1);
    }
}