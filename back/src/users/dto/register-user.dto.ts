import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  upload?: any;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty({ required: false })
  habitatId: number;

  @ApiProperty({ required: false })
  speciesId?: number;

  @ApiProperty({ required: false })
  habitatName: string;

  @ApiProperty({ required: false })
  habitatColor: string;

  @ApiProperty({ required: false })
  speciesName: string;

  @ApiProperty({ required: false })
  speciesSound: string;
}
