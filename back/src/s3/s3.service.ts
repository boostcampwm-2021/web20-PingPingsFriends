import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { CreateS3Dto } from './dto/create-s3.dto';
import { UpdateS3Dto } from './dto/update-s3.dto';
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

@Injectable()
export class S3Service {
  async uploadS3(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function (err) {
        if (err) {
          console.log(err);
          return res.status(404).json(`Failed to upload image file: ${err}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(`Failed to upload image file: ${err}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'spongebob-bucket',
      acl: 'public-read',
      key: function (request, file, cb) {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
      },
    }),
  }).array('upload', 1);

  create(createS3Dto: CreateS3Dto) {
    return 'This action adds a new s3';
  }

  findAll() {
    return `This action returns all s3`;
  }

  findOne(id: number) {
    return `This action returns a #${id} s3`;
  }

  update(id: number, updateS3Dto: UpdateS3Dto) {
    return `This action updates a #${id} s3`;
  }

  remove(id: number) {
    return `This action removes a #${id} s3`;
  }
}
