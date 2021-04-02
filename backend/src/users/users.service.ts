import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { infectedUsersDto } from './dto/infected-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  listInfected(): Promise<infectedUsersDto[]> {
    return this.userRepository.listInfected();
  }

  createUser(createUserDto: CreateUserDto): Promise<number> {
    const { name, email, password } = createUserDto;
    return this.userRepository.createUser(name, email, password);
  }

  iHaveCovid(id: number): Promise<string> {
    return this.userRepository.iHaveCovid(id, new Date());
  }
}
