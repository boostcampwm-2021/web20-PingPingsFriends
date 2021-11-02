import { ApiProperty } from '@nestjs/swagger';

export class userResponseDto {
  @ApiProperty({ description: 'id' })
  id: number;
  @ApiProperty({ description: '이름' })
  name: string;
}
