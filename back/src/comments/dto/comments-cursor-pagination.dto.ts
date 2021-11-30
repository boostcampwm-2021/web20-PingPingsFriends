import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { CursorPaginationDto } from 'common/dto/cursor-pagination.dto';
export class CommentCursorPaginationDto extends CursorPaginationDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty()
  postId: number;
}
