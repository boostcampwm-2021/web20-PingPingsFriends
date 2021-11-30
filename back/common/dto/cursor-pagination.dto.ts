import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
export class CursorPaginationDto {
  @IsOptional()
  @ApiProperty({ required: false })
  lastId?: number;

  @ApiProperty()
  @IsNotEmpty()
  limit: number;
}
