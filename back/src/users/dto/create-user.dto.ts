import { IsNumberString, IsOptional } from 'class-validator';

export class CreateUserDto {
  username: string;

  password: string;

  nickname: string;

  @IsOptional()
  @IsNumberString()
  habitatId?: number;

  @IsOptional()
  @IsNumberString()
  speciesId?: number;

  @IsOptional()
  habitatName?: string;

  @IsOptional()
  habitatColor?: string;

  @IsOptional()
  speciesName?: string;

  @IsOptional()
  speciesSound?: string;
}
