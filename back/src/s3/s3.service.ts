import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  region: 'kr-standard',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

interface fileDto extends Express.Multer.File {
  location: string;
  mimetype: string;
}

@Injectable()
export class S3Service {
  uploadS3(@Req() req: Request, @Res() res: Response) {
    return new Promise((resolve, reject) => {
      this.upload(req, res, (err: any) => {
        if (err) reject();

        const files = req.files;

        if (Array.isArray(files)) {
          const contentsInfos = files.map((v: fileDto, i: number) => {
            return {
              location: v.location,
              mimetype: v.mimetype,
            };
          });
          resolve(contentsInfos);
        }
      });
    });
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
  }).array('upload', 10);
}
