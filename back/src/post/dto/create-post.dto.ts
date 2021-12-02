import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString } from 'class-validator';
import { FilesUploadDto } from 'common/dto/files-upload.dto';

export class CreatePostDto extends FilesUploadDto {
  @ApiProperty()
  @IsNumberString()
  habitatId: number;

  @ApiProperty()
  @IsString()
  humanContent: string;
}
