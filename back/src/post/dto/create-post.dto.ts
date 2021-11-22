import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { FilesUploadDto } from 'common/dto/files-upload.dto';

export class CreatePostDto extends FilesUploadDto {
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
