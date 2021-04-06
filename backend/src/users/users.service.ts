import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InfectedUserDto } from './dto/infected-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtPayloadDto } from './jwt-payload.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  listInfected(): Promise<InfectedUserDto[]> {
    return this.userRepository.listInfected();
  }

  createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    return this.userRepository.createUser(name, email, password);
  }

  async signinUser(signinUserDto: SigninUserDto): Promise<{ accessToken: string }> {
    const { email, password } = signinUserDto;
    const user = await this.userRepository.signinUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const permissionCodes = user.permissions.map(permission => permission.code);
    const payload: JwtPayloadDto = { email: user.email, permissions: permissionCodes, id: user.id };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  iHaveCovid(id: number): Promise<string> {
    return this.userRepository.iHaveCovid(id, new Date());
  }

  addPermission(code: string, id: number) {
    return this.userRepository.addPermission(code.toUpperCase(), id);
  }

  removePermission(code: string, id: number) {
    return this.userRepository.removePermission(code.toUpperCase(), id);
  }
}
