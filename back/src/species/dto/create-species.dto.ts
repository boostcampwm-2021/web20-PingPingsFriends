import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateSpeciesDto {
  @ApiProperty()
  @MaxLength(50, {
    message: 'comment is too long',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MaxLength(10, {
    message: 'comment is too long',
  })
  @IsNotEmpty()
  sound: string;
}
