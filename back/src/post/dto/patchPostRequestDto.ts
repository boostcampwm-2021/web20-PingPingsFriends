import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PatchPostRequestDto {
  @ApiProperty()
  @IsString()
  contentIds: string;

  @ApiProperty()
  @IsString()
  humanContent: string;

  @ApiProperty()
  @IsString()
  animalContent: string;
}
