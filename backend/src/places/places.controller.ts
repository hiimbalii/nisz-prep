import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Controller('check-in')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  // @UsePipes(ValidationPipe)
  createPlace(@Body(ValidationPipe) createPlaceDto: CreatePlaceDto) {
    return this.placesService.createPlace(createPlaceDto);
  }

  // @Get()
  // findAll() {
  //   return this.placesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.placesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
  //   return this.placesService.update(+id, updatePlaceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.placesService.remove(+id);
  // }
}
