import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';
import { PlaceRepository } from './places.repostiory';

@Injectable()
export class PlacesService {
  constructor(@InjectRepository(PlaceRepository) private placeRepository: PlaceRepository) {}

  createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placeRepository.createPlace(createPlaceDto);
  }
}
