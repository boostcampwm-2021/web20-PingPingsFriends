import { Injectable, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

dotenv.config();

export const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  region: 'kr-standard',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export const multerOption = {
  storage: multerS3({
    s3: s3,
    bucket: 'spongebob-bucket',
    acl: 'public-read',
    key: function (request, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
};

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

        console.log(files);

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

  upload = multer(multerOption).array('upload', 10);

  getPartialFilesInfo(files: Express.Multer.File[]) {
    const contentsInfos = files.map((v: fileDto, i: number) => {
      return {
        url: v.location,
        mimeType: v.mimetype,
      };
    });
    return contentsInfos;
  }
}
