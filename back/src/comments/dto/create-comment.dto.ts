import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, MaxLength, MinLength } from 'class-validator';
export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty()
  post_id: number;

  @IsNotEmpty()
  @MinLength(1, {
    message: 'comment is not empty',
  })
  @MaxLength(500, {
    message: 'comment is too long',
  })
  @ApiProperty()
  content: string;
}
