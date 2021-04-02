import { Controller, Post, Body, ValidationPipe, Put, Param, Logger } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Place')
@Controller('check-in')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}
  private logger = new Logger('PlacesController');

  @Post()
  @ApiOperation({ summary: 'Felhasználó jelentése, hogy volt valahol' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 404, description: 'Nincs felhasználó a megadott emaillel' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  iHaveBeenHereCred(
    @Body('email', ValidationPipe) email: string,
    @Body('date', ValidationPipe) date: Date,
    @Body(ValidationPipe) createPlaceDto: CreatePlaceDto,
  ) {
    return this.placesService.iHaveBeenHereCred(email, new Date(date), createPlaceDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Felhasználó jelentése, hogy volt valahol' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 404, description: 'Nincs felhasználó a megadott ID-vel' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  iHaveBeenHere(
    @Param('id') userId: number,
    @Body('date', ValidationPipe) date: Date,
    @Body(ValidationPipe) createPlaceDto: CreatePlaceDto,
  ) {
    return this.placesService.iHaveBeenHere(userId, new Date(date), createPlaceDto);
  }
}
