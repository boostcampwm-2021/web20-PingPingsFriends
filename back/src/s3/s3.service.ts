import { Inject, Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { CreateS3Dto } from './dto/create-s3.dto';
import { UpdateS3Dto } from './dto/update-s3.dto';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

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
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) {}

  async uploadS3(@Req() req, @Res() res) {
    try {
      this.upload(req, res, (err: any) => {
        if (err) {
          console.log(err);
          return res.status(404).json(`Failed to upload image file: ${err}`);
        }
        const imageUrl = req.files[0].location;
        this.updateProfile(imageUrl);
        return res.status(201).json(imageUrl);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(`Failed to upload image file: ${err}`);
    }
  }

  async updateProfile(url: string) {
    const user = await this.userRepository.findOne(1);
    user.url = url;
    await this.userRepository.save(user);
    return url;
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
}
