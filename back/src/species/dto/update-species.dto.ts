import { PartialType } from '@nestjs/swagger';
import { CreateSpeciesDto } from './create-species.dto';

export class UpdateSpeciesDto extends PartialType(CreateSpeciesDto) {}
