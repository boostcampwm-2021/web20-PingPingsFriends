import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty()
  skip: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty()
  take: number;
}
