import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CursorPaginationDto {
  @ApiProperty({ required: false })
  lastId?: number;

  @ApiProperty()
  @IsNotEmpty()
  postId: number;

  @ApiProperty()
  @IsNotEmpty()
  limit: number;
}
