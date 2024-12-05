import {createRabbit} from "./connection";
import {ProductService} from "../../application/services/product.service";
import {BasketService} from "../../application/services/basket.service";
import {sendOrderMail} from "../../shared/utils/nodemailer";
import createHttpError from "http-errors";

export class Consumer {
    private productService: ProductService;
    private basketService: BasketService;

    constructor() {
        this.productService = new ProductService();
        this.basketService = new BasketService();
    }

    consumeQueue = async (queueName: string) => {
        try {
            const connection = await createRabbit();
            if (!connection) throw createHttpError(500, "Failed to connect to RabbitMQ");

            const channel = await connection.createChannel();
            await channel.assertQueue(queueName, { durable: true });

            await channel.consume(queueName, async (msg) => {
                if (!msg) return;

                try {
                    const data = JSON.parse(msg.content.toString());
                    const itemsProcessed = [];
                    console.log("Message received:", data);

                    for (const item of data.basketData) {
                        const success = await this.productService.discardProductInCacheAndDB(item.product_id, item.quantity);
                        if (success) {
                            itemsProcessed.push(item);
                        } else {
                            console.log(
                                `Insufficient stock: Operation canceled for product ${item.product_id}.`
                            );
                            throw createHttpError(400, `Insufficient stock for product ${item.product_id}. Operation canceled.`);
                        }
                    }

                    if (itemsProcessed.length === data.basketData.length) {
                        await this.basketService.clearBasketByUserID(data.user_id);
                        const mailSent = await sendOrderMail(data.user_email, JSON.stringify(data));
                        if (!mailSent) throw createHttpError(500, "Failed to send order confirmation email.");
                    }

                    console.log("Order processed successfully.");
                    channel.ack(msg);
                } catch (error) {
                    console.error("Error processing message:", error);
                    channel.nack(msg, false, false);
                }
            });

            console.log(`Started consuming messages from queue: ${queueName}`);
        } catch (error) {
            console.error("Error setting up consumer:", error);
            throw createHttpError(500, "Failed to set up consumer.");
        }
    };
}


