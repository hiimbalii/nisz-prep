import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { Move } from '../moves/entities/move.entity';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  private logger = new Logger('PlaceRepository');

  async iHaveBeenHere(userId: number, date: Date, morning: boolean, lng: number, lat: number) {
    const move = new Move();
    move.date = date;
    move.morning = morning;
    move.user = userId;
    lng = Math.round(lng * 10000) / 10000;
    lat = Math.round(lat * 10000) / 10000;

    const place = await Place.findOne({ longitude: lng, latitude: lat });
    let placeId: number;
    if (place) placeId = place.id;
    else {
      const { id } = await this.createPlace(lng, lat);
      placeId = id;
    }
    move.place = placeId;
    try {
      await move.save();
      this.logger.verbose(`Move been has successfully saved with ${placeId} place ID`);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Move already exists');
      } else {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async createPlace(lng: number, lat: number): Promise<Place> {
    const place = new Place();
    place.longitude = lng;
    place.latitude = lat;
    await place.save();

    this.logger.verbose(`Place created {lng:${lng}; lat:${lat}}`);
    return place;
  }
}
