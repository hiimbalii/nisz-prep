import {
  Controller,
  Post,
  Body,
  Param,
  ValidationPipe,
  Put,
  Get,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InfectedUserDto } from './dto/infected-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from '@nestjs/passport';

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
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('signin')
  signIn(@Body(ValidationPipe) signinUserDto: SigninUserDto): Promise<{ accessToken: string }> {
    return this.usersService.signinUser(signinUserDto);
  }

  @Put('infected/:id')
  @ApiOperation({ summary: 'Felhasználó jelentése, hogy beteg' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Az ID számmá konvertálása sikertelen' })
  @ApiResponse({ status: 404, description: 'Nincs felhasználó a megadott ID-vel' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  @UseGuards(AuthGuard())
  iHaveCovid(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.usersService.iHaveCovid(id);
  }

  @Put('permission/:code/:id')
  @ApiOperation({ summary: 'Jogosultság hozzáadása egy felhasználóhoz' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Az ID számmá konvertálása sikertelen' })
  @ApiResponse({ status: 404, description: 'Nincs ilyen IDjű, vagy kódú adat az adatbázisban' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  addPermission(@Param('code') code: string, @Param('id', ParseIntPipe) id: number) {
    return this.usersService.addPermission(code, id);
  }

  @Delete('permission/:code/:id')
  @ApiOperation({ summary: 'Jogosultság eltávolítása egy felhasználótól' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Az ID számmá konvertálása sikertelen' })
  @ApiResponse({ status: 404, description: 'Nincs ilyen IDjű, vagy kódú adat az adatbázisban' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  removePermission(@Param('code') code: string, @Param('id', ParseIntPipe) id: number) {
    return this.usersService.removePermission(code, id);
  }
}
