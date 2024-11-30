import mongoose from 'mongoose';
import env from "../../shared/utils/env";

export const connecToDatabase = async () => {
    try {
        const conn = await mongoose.connect(env.MONGO_URI as string, {
            serverApi: "1",
        });

        console.log(`MongoDB Connected: ${conn.connection.db?.databaseName}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
