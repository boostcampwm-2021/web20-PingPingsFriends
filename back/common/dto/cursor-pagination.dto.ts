import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
export class CursorPaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false })
  lastId?: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  limit: number;
}
