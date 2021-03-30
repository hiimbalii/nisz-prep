import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';

@Controller('check-in')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  createPlace(@Body(ValidationPipe) createPlaceDto: CreatePlaceDto) {
    return this.placesService.createPlace(createPlaceDto);
  }
}
