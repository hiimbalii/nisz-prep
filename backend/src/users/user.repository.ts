import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException, ConflictException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async createUser(createUserDto: CreateUserDto): Promise<number> {
    const { email, password, name } = createUserDto;

    const salt = await bcrypt.genSalt();

    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, salt);
    user.infectedDate = new Date(0);
    user.morning = null;
    user.name = name;
    user.salt = salt;

    try {
      await user.save();
      this.logger.verbose(`User ${name} has successfully registered`);
      return user.id;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async iHaveCovid(id: number, date: Date): Promise<string> {
    if (!id) throw new BadRequestException(`No id provided`);
    const user = await User.findOne(id);
    if (!user) throw new NotFoundException(`No user found with id ${id}`);
    const newDate = new Date(date.getTime() + 2000 * 3600);
    user.infectedDate = newDate;
    user.morning = parseInt(newDate.toISOString().substring(11, 13)) >= 12 ? false : true;
    this.logger.verbose(`infectedDate for user ${user.name} is now updated`);
    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return '';
  }
}
