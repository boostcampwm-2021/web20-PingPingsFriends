import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3-transform';
import * as dotenv from 'dotenv';
import * as sharp from 'sharp';
import { v1 as uuidv1 } from 'uuid';
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
    key: function (req, file, cb) {
      file.__uuid__ = uuidv1().toString(); // ***
      cb(null, file.__uuid__);
    },
    transforms: [
      {
        id: 'origin',
        key: function (request, file, cb) {
          cb(null, `${file.__uuid__}.webp`);
        },
        transform: function (req, file, cb) {
          cb(null, sharp({ animated: true }).webp({ quality: 90 }));
        },
      },
      {
        id: 'profile',
        key: function (request, file, cb) {
          cb(null, `${file.__uuid__}-profile.webp`);
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize({ width: 100, height: 100 }).webp({ quality: 80 }));
        },
      },
    ],
    bucket: 'spongebob-bucket',
    acl: 'public-read',
    contentType: function (req, file, cb) {
      cb(null, 'image/webp');
    },
  }),
};

export const multerTransFormOption = {
  storage: multerS3({
    s3,
    shouldTransform: true,
    key: function (req, file, cb) {
      file.__uuid__ = uuidv1().toString(); // ***
      cb(null, file.__uuid__);
    },
    transforms: [
      {
        id: 'origin',
        key: function (request, file, cb) {
          cb(null, `${file.__uuid__}.webp`);
        },
        transform: function (req, file, cb) {
          cb(null, sharp({ animated: true }).webp({ quality: 90 }));
        },
      },
      {
        id: 'feed',
        key: function (request, file, cb) {
          cb(null, `${file.__uuid__}-feed.webp`);
        },
        transform: function (req, file, cb) {
          cb(
            null,
            sharp({ animated: true }).resize({ width: 470, height: 500 }).webp({ quality: 80 })
          );
        },
      },
    ],
    bucket: 'spongebob-bucket',
    acl: 'public-read',
    contentType: function (req, file, cb) {
      cb(null, 'image/webp');
    },
  }),
};
