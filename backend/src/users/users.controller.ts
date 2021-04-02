import {
  Controller,
  Post,
  Body,
  Param,
  ValidationPipe,
  Put,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InfectedUserDto } from './dto/infected-user.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('infected')
  @ApiOperation({ summary: 'Fertőzött felhasználók kilistázása' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet', type: InfectedUserDto })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  listInfected(): Promise<InfectedUserDto[]> {
    return this.usersService.listInfected();
  }

  @Post('signup')
  @ApiOperation({ summary: 'Felhasználó regisztrálása' })
  @ApiResponse({ status: 201, description: 'Felhasználó létrehozva', type: Number })
  @ApiResponse({ status: 400, description: 'Hibás adatok küldve' })
  @ApiResponse({ status: 409, description: 'Már letezik felhasználó a megadott adatokkal' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<number> {
    return this.usersService.createUser(createUserDto);
  }

  @Put('infected/:id')
  @ApiOperation({ summary: 'Felhasználó jelentése, hogy beteg' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Az ID számmá konvertálása sikertelen' })
  @ApiResponse({ status: 404, description: 'Nincs felhasználó a megadott ID-vel' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  iHaveCovid(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.usersService.iHaveCovid(id);
  }
}
