import { Controller, Post, Body, Param, ValidationPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<number> {
    return this.usersService.createUser(createUserDto);
  }

  @Put('infected/:id')
  iHaveCovid(@Param('id', ValidationPipe) id: number): Promise<string> {
    return this.usersService.iHaveCovid(id, new Date());
  }
}
