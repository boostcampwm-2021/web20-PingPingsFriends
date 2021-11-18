import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CursorPaginationDto {
  @ApiProperty()
  @IsNotEmpty()
  lastId: number;

  @ApiProperty()
  @IsNotEmpty()
  postId: string;

  @ApiProperty()
  @IsNotEmpty()
  limit: string;
}
