import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';
export class CreateCommentDto {
  @IsInt()
  @Min(1)
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
