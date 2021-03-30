import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { PlaceRepository } from './places.repostiory';

@Injectable()
export class PlacesService {
  constructor(@InjectRepository(PlaceRepository) private placeRepository: PlaceRepository) {}

  createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placeRepository.createPlace(createPlaceDto);
  }

  // findAll() {
  //   return `This action returns all places`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} place`;
  // }

  // update(id: number, updatePlaceDto: UpdatePlaceDto) {
  //   return `This action updates a #${id} place`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} place`;
  // }
}
