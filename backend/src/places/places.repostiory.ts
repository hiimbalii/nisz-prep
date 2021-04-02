import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { Move } from '../moves/entities/move.entity';
import { User } from 'src/users/entities/user.entity';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  private logger = new Logger('PlaceRepository');

  async createPlace(lng: number, lat: number): Promise<Place> {
    const place = new Place();
    place.longitude = lng;
    place.latitude = lat;

    await place.save();

    this.logger.verbose(`Place created at lng:${lng}; lat:${lat}`);

    return place;
  }

  async iHaveBeenHere(userId: number, date: Date, morning: boolean, lng: number, lat: number) {
    const move = new Move();
    move.date = date;
    move.morning = morning;
    move.user = userId;

    const place = await Place.findOne({ longitude: lng, latitude: lat });
    if (!place) {
      const { id } = await this.createPlace(lng, lat);
      move.place = id;
    } else {
      move.place = place.id;
    }
    try {
      await move.save();
      this.logger.verbose(`Move been has successfully save`);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Move already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserId(email): Promise<number> {
    const { id } = await User.findOne(email);
    return await id;
  }
}
