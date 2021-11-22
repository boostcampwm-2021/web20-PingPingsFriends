import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { FilesUploadDto } from 'common/dto/files-upload.dto';

export class PatchPostRequestDto extends FilesUploadDto {
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
