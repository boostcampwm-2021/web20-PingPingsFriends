import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  post_id: number;

  @ApiProperty()
  @IsNotEmpty()
  content: string;
}
