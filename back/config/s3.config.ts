import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as dotenv from 'dotenv';

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

export default multerOption;
