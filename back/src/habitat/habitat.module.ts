import { Module } from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { HabitatController } from './habitat.controller';

@Module({
  controllers: [HabitatController],
  providers: [HabitatService]
})
export class HabitatModule {}
