import { IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  username: string;

  password: string;

  nickname: string;

  @IsOptional()
  @IsNumber()
  habitatId?: number;

  @IsOptional()
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
