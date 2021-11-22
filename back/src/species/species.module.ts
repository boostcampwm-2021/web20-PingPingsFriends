import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesRepository } from './species.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesRepository])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
