import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenity } from './amenity.entity';
import { AdminAmenityController } from './admin-amenity.controller';
import { AmenityService } from './amenity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity])],
  controllers: [AdminAmenityController],
  providers: [AmenityService],
})
export class AmenityModule {}
