import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginationQueryDto {
  @IsNotEmpty()
  @ApiProperty()
  skip: number;

  @IsNotEmpty()
  @ApiProperty()
  take: number;
}
