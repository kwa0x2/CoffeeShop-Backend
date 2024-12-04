import "express-session"
import mongoose from "mongoose";

declare module 'express-session' {
    interface Session {
        user_id?: mongoose.Types.ObjectId;
    }
}