import * as AWS from 'aws-sdk';
import * as multerS3TS from 'multer-s3-transform';
import * as multerS3 from 'multer-s3';
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

const multerOption = {
  storage: multerS3({
    s3,
    bucket: 'spongebob-bucket',
    acl: 'public-read',
    key: function (request, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
};

const multerTransFormOption = {
  storage: multerS3TS({
    s3,
    shouldTransform: true,
    transforms: [
      {
        id: 'original',
        key: function (request, file, cb) {
          cb(
            null,
            `${Date.now().toString()}.${file.mimetype.split('/')[1]}`
          );
        },
        transform: function (req, file, cb) {
          cb(null, sharp());
        },
      },
      {
        id: 'resized',
        key: function (request, file, cb) {
          cb(null, `${Date.now().toString()}.jpeg`);
        },
        transform: function (req, file, cb) {
          cb(
            null,
            sharp()
              .resize(480, 500, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
              })
              .jpeg({ quality: 80 })
          );
        },
      },
    ],
    bucket: 'spongebob-bucket',
    acl: 'public-read',
  }),
};
export default multerTransFormOption;
