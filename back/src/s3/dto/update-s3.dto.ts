import { PartialType } from '@nestjs/swagger';
import { CreateS3Dto } from './create-s3.dto';

export class UpdateS3Dto extends PartialType(CreateS3Dto) {}
