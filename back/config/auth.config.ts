import * as dotenv from 'dotenv';

dotenv.config();

const ACCESS_EXPIRE_TIME = 24 * 60 * 60;
const REFRESH_EXPIRE_TIME = 24 * 60 * 60;

export const jwtOption = {
  secret: process.env.AUTH_ACCESS_SECRET_KEY,
  expiresIn: ACCESS_EXPIRE_TIME,
};

export const jwtRefeshOption = {
  secret: process.env.AUTH_REFRESH_SECRET_KEY,
  expiresIn: REFRESH_EXPIRE_TIME,
};
