import { Controller, Post, Body, ValidationPipe, Put, Param, ParseIntPipe } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Place')
@Controller('check-in')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  @ApiOperation({ summary: 'Felhasználó jelentése, hogy volt valahol' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Nem megfelelő adatok' })
  @ApiResponse({ status: 404, description: 'Nincs felhasználó a megadott emaillel' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  iHaveBeenHereWithEmail(
    @Body('email') email: string,
    @Body(ValidationPipe) createPlaceDto: CreatePlaceDto,
  ) {
    return this.placesService.iHaveBeenHereWithEmail(email, createPlaceDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Felhasználó jelentése, hogy volt valahol' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Nem megfelelő adatok' })
  @ApiResponse({ status: 404, description: 'Nincs felhasználó a megadott ID-vel' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  iHaveBeenHere(
    @Param('id', ParseIntPipe) userId: number,
    @Body(ValidationPipe) createPlaceDto: CreatePlaceDto,
  ) {
    return this.placesService.iHaveBeenHere(userId, createPlaceDto);
  }
}
