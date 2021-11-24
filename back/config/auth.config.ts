import * as dotenv from 'dotenv';

dotenv.config();

const EXPIRE_TIME = 60 * 60;

export const jwtOption = {
  secret: process.env.AUTH_SECRET_KEY,
  signOptions: { expiresIn: EXPIRE_TIME },
};
