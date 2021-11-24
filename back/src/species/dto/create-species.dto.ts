import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSpeciesDto {
  @ApiProperty()
  @IsNotEmpty()
  sound: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
