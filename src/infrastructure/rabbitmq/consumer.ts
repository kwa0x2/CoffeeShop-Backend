import {createRabbit} from "./connection";
import {ProductService} from "../../application/services/product.service";
import {BasketService} from "../../application/services/basket.service";
import {sendOrderMail} from "../../shared/utils/nodemailer";

export class Consumer {
    private productService: ProductService;
    private basketService: BasketService;

    constructor() {
        this.productService = new ProductService();
        this.basketService = new BasketService();
    }

    consumeQueue = async (queueName: string) => {
        const connection = await createRabbit();
        if (!connection) throw new Error("RabbitMQ connection failed");

        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });

        await channel.consume(queueName, async (msg) => {
            if (!msg) return;

            const data = JSON.parse(msg.content.toString());
            const itemsProcessed = [];
            console.log(data)

            for (const item of data.basketData) {
                const success = await this.productService.discardProductInCacheAndDB(item.product_id, item.quantity);
                if (success) {
                    itemsProcessed.push(item);
                }else {
                    console.log(
                        `Stok yetersiz: Ürün ${item.product_id} için işlem iptal edildi.`
                    );
                }
            }

            if (itemsProcessed.length === data.basketData.length) {
                await this.basketService.clearBasketByUserID(data.user_id);
                const mailSent = await sendOrderMail(data.user_email, JSON.stringify(data));
                if (!mailSent) throw new Error("Failed to send order confirmation mail.");
            }

            console.log("Order processed successfully.");
            channel.ack(msg);
        });

        console.log(`Started consuming messages from queue: ${queueName}`);
    };
}


