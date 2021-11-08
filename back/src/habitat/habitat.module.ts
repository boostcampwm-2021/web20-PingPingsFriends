import { Module } from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { HabitatController } from './habitat.controller';
import { habitatProviders } from './habitat.provider';
import { Habitat } from './entities/habitat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Habitat])],
  controllers: [HabitatController],
  providers: [HabitatService],
})
export class HabitatModule {}
