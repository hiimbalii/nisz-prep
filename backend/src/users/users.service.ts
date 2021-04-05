import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InfectedUserDto } from './dto/infected-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  listInfected(): Promise<InfectedUserDto[]> {
    return this.userRepository.listInfected();
  }

  createUser(createUserDto: CreateUserDto): Promise<number> {
    const { name, email, password } = createUserDto;
    return this.userRepository.createUser(name, email, password);
  }

  iHaveCovid(id: number): Promise<string> {
    return this.userRepository.iHaveCovid(id, new Date());
  }

  addPermission(code: string, id: number) {
    return this.userRepository.addPermission(code, id);
  }

  removePermission(code: string, id: number) {
    return this.userRepository.removePermission(code, id);
  }
}
