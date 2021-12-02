import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { CursorPaginationDto } from 'common/dto/cursor-pagination.dto';
export class CommentCursorPaginationDto extends CursorPaginationDto {
  @IsNotEmpty()
  @ApiProperty()
  postId: number;
}
