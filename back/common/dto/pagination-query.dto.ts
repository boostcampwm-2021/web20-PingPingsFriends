import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @ApiProperty()
  skip?: number;

  @IsOptional()
  @ApiProperty()
  take?: number;
}
