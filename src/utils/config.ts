import * as envalid from 'envalid';

const { str } = envalid;

export const config = envalid.cleanEnv(
    process.env,
    {
        MONGO_URL: str(),
        MONGO_DB: str(),
        NODE_ENV: str(),
    }
)