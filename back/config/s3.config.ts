import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3-transform';
import * as dotenv from 'dotenv';
import * as sharp from 'sharp';

dotenv.config();

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  region: 'kr-standard',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export const multerUserOption = {
  storage: multerS3({
    s3,
    shouldTransform: true,
    transforms: [
      {
        id: 'resized',
        key: function (request, file, cb) {
          cb(null, `${Date.now().toString()}.webp`);
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize({ width: 100, height: 100 }).webp({ quality: 80 }));
        },
      },
    ],
    bucket: 'spongebob-bucket',
    acl: 'public-read',
  }),
};

export const multerTransFormOption = {
  storage: multerS3({
    s3,
    shouldTransform: true,
    transforms: [
      {
        id: 'transform',
        key: function (request, file, cb) {
          cb(null, `${Date.now().toString()}.webp`);
        },
        transform: function (req, file, cb) {
          cb(null, sharp().webp({ quality: 80 }));
        },
      },
    ],
    bucket: 'spongebob-bucket',
    acl: 'public-read',
  }),
};
