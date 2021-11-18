import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNumber()
  habitatId: number;

  @ApiProperty()
  @IsString()
  humanContent: string;

  @ApiProperty()
  @IsString()
  animalContent: string;
}
