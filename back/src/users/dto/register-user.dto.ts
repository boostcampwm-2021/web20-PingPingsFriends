import { ApiProperty } from '@nestjs/swagger';
import { FileUploadDto } from 'common/dto/file-upload.dto';

export class RegisterUserDto extends FileUploadDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  habitatId: number;

  @ApiProperty()
  speciesId: number;
}
