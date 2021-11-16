import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  habitatId: number;

  @ApiProperty()
  humanContent: string;

  @ApiProperty()
  animalContent: string;
}
