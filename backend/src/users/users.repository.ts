import { EntityRepository, In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Move } from 'src/moves/entities/move.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async listInfected() {
    const infectedUsers = await User.find({ morning: In([true, false]) });
    const valami = [];
    await infectedUsers.forEach(async user => {
      const moves = await Move.getRepository().find({
        where: { user: user.id },
        order: { date: 'DESC' },
        take: 1,
      });

      console.log('asdasdsadasd');
      valami.push({
        name: user.name,
        email: user.email,
        id: user.id,
        userInfection: { infectedDate: user.infectedDate, morning: user.morning },
        lastMove: { ...moves[0] },
      });
    });
    console.log(valami);
    return valami;
  }

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
