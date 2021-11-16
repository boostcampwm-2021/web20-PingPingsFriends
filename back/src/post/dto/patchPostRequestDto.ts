import { ApiProperty } from '@nestjs/swagger';

export class PatchPostRequestDto {
  @ApiProperty()
  contentIds: string;

  @ApiProperty()
  humanContent: string;

  @ApiProperty()
  animalContent: string;
}
