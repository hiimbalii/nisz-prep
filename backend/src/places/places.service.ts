import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaceEmailDto } from './dto/create-place-email.dto';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceRepository } from './places.repository';

@Injectable()
export class PlacesService {
  constructor(@InjectRepository(PlaceRepository) private placeRepository: PlaceRepository) {}

  async iHaveBeenHereWithEmail(createPlaceEmailDto: CreatePlaceEmailDto) {
    const { email, lng, lat, date } = createPlaceEmailDto;
    const userId = await this.placeRepository.getUserId(email);
    this.iHaveBeenHere(userId, { lng, lat, date });
  }

  iHaveBeenHere(userId: number, createPlaceDto: CreatePlaceDto) {
    const { lng, lat, date } = createPlaceDto;
    const formatedDate = new Date(date);
    if (!formatedDate.getDate()) throw new BadRequestException('Invalid Date');
    if (lng > 180 || lng < -180) throw new BadRequestException('Invalid longitude(lng)');
    if (lat > 90 || lat < -90) throw new BadRequestException('Invalid latitude(lat)');
    const morning = formatedDate.getHours() < 12;
    return this.placeRepository.iHaveBeenHere(userId, date, morning, lng, lat);
  }
}
