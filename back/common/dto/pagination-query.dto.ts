import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @ApiProperty()
  skip?: number;

  @IsOptional()
  @ApiProperty()
  take?: number;
}
