import { PartialType } from '@nestjs/swagger';
import { CreateHeartDto } from './create-heart.dto';

export class UpdateHeartDto extends PartialType(CreateHeartDto) {}
