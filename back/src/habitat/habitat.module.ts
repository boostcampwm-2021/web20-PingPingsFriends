import { Module } from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { HabitatController } from './habitat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { habitatRepository } from './habitat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([habitatRepository])],
  controllers: [HabitatController],
  providers: [HabitatService],
})
export class HabitatModule {}
