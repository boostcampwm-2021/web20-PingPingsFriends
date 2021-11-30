import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPositive } from 'class-validator';
export class CursorPaginationDto {
  @IsOptional()
  @ApiProperty({ required: false })
  lastId?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  limit?: number;
}
