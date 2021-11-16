import { ApiProperty } from '@nestjs/swagger';

export class s3ResponseDto {
  @ApiProperty({ description: 'url' })
  url: string;
}
