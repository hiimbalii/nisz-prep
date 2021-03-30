import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  private logger = new Logger('PlaceRepository');

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const { lng, lat, placeName } = createPlaceDto;

    const place = new Place();
    place.longitude = lng;
    place.latitude = lat;
    place.placeName = placeName;

    await place.save();

    return place;
  }
}
