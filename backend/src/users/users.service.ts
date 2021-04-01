import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  listInfected() {
    return this.userRepository.listInfected();
  }

  createUser(createUserDto: CreateUserDto): Promise<number> {
    return this.userRepository.createUser(createUserDto);
  }

  iHaveCovid(id: number, date: Date): Promise<string> {
    return this.userRepository.iHaveCovid(id, date);
  }
}
