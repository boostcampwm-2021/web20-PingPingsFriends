import { PartialType } from '@nestjs/swagger';
import { CreateHabitatDto } from './create-habitat.dto';

export class UpdateHabitatDto extends PartialType(CreateHabitatDto) {}
