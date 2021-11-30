import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsNotEmpty()
  @ApiProperty()
  skip: number;

  @IsNotEmpty()
  @ApiProperty()
  take: number;
}
