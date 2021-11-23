import * as dotenv from 'dotenv';
dotenv.config();

export const loggerEnv = process.env.NODE_ENV === 'dev' ? 'dev' : 'combined';
