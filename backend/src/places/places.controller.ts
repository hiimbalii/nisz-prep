import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Place')
@Controller('check-in')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  @ApiOperation({ summary: 'Új hely létrehozása' })
  @ApiResponse({ status: 201, description: 'Hely' })
  @ApiResponse({ status: 400, description: 'Hibás adatok küldve' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  createPlace(@Body(ValidationPipe) createPlaceDto: CreatePlaceDto) {
    return this.placesService.createPlace(createPlaceDto);
  }
}
