import { PartialType } from '@nestjs/swagger';
import { CreateLikedDto } from './create-liked.dto';

export class UpdateLikedDto extends PartialType(CreateLikedDto) {}
