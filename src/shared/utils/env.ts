import "dotenv/config";

import {cleanEnv, email, port, str, url} from "envalid";

export default cleanEnv(process.env, {
    MONGO_URI: str(),
    MONGO_DB_NAME: str(),
    PORT: port(),
    EMAIL: email(),
    EMAIL_PASSWORD: str(),
    JWT_SECRET: str()
});