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

  @ApiProperty()
  habitatId: number;

  @ApiProperty({ required: false })
  speciesId?: number;

  @ApiProperty({ required: false })
  sound: string;

  @ApiProperty({ required: false })
  name: string;
}
