import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsUrl } from 'class-validator';

export class GetPostResponseDto {
  @ApiProperty()
  @IsNumber()
  post_id: number;

  @ApiProperty()
  @IsString()
  human_content: string;

  @ApiProperty()
  @IsString()
  animal_content: string;

  @ApiProperty()
  @IsDate()
  created_at: string;

  @ApiProperty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  @IsUrl()
  user_image_url: string;

  @ApiProperty()
  @IsString()
  post_contents_urls: string;

  @ApiProperty()
  @IsString()
  post_contents_types: string;

  @ApiProperty()
  @IsNumber()
  numOfHearts: number;

  @ApiProperty()
  @IsNumber()
  is_heart: number;
}
