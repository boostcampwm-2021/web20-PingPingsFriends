import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { s3ResponseDto } from './dto/s3ResponseDto';
import { S3Service } from './s3.service';

@ApiTags('s3')
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @ApiOperation({
    summary: '이미지 업로드',
    description: '이미지를 받아 Object Storage에 업로드하는 api입니다.',
  })
  @ApiCreatedResponse({ description: '성공', type: s3ResponseDto })
  @Post()
  async uploadImage(@Req() req, @Res() res) {
    await this.s3Service.uploadS3(req, res);
  }
}
