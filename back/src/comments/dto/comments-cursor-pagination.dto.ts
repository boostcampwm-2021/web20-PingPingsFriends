import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CursorPaginationDto } from 'common/dto/cursor-pagination.dto';
export class CommentCursorPaginationDto extends CursorPaginationDto {
  @ApiProperty()
  @IsNotEmpty()
  postId: number;
}
