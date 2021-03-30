import { Controller, Post, Body, Param, ValidationPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Felhasználó regisztrálása' })
  @ApiResponse({ status: 201, description: 'Felhasználó létrehozva' })
  @ApiResponse({ status: 400, description: 'Hibás adatok küldve' })
  @ApiResponse({ status: 409, description: 'Már letezik felhasználó a megadott adatokkal' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<number> {
    return this.usersService.createUser(createUserDto);
  }

  @Put('infected/:id')
  @ApiOperation({ summary: 'Felhasználó jelentése, hogy beteg' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 404, description: 'Nincs felhasználó a megadott ID-vel' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  iHaveCovid(@Param('id', ValidationPipe) id: number): Promise<string> {
    return this.usersService.iHaveCovid(id, new Date());
  }
}
