import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceRepository } from './places.repostiory';

@Injectable()
export class PlacesService {
  constructor(@InjectRepository(PlaceRepository) private placeRepository: PlaceRepository) {}
  private logger = new Logger('PlacesController');

  iHaveBeenHere(userId: number, date: Date, createPlaceDto: CreatePlaceDto) {
    const { lng, lat } = createPlaceDto;
    const morning = date.getHours() < 12;
    return this.placeRepository.iHaveBeenHere(userId, date, morning, lng, lat);
  }
  async iHaveBeenHereCred(email: string, date: Date, createPlaceDto: CreatePlaceDto) {
    const { lng, lat } = createPlaceDto;
    const morning = date.getHours() < 12;
    const userId = await this.placeRepository.getUserId(email);
    return this.placeRepository.iHaveBeenHere(userId, date, morning, lng, lat);
  }
}
