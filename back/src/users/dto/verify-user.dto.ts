import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class VerifyUserDto {
  @ApiProperty()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @IsOptional()
  nickname?: string;
}
