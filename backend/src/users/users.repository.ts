import { EntityRepository, In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Move } from 'src/moves/entities/move.entity';
import { InfectedUserDto } from './dto/infected-user.dto';
import { Place } from 'src/places/entities/place.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async listInfected(): Promise<InfectedUserDto[]> {
    const infectedUsers = await User.find({ morning: In([true, false]) });
    const returns = [];

    for (const user of infectedUsers) {
      const lastMove = await Move.find({
        where: { user: user.id },
        order: { date: 'DESC' },
        take: 1,
      });

      let lastPlace: Place;
      if (lastMove.length) {
        const places = await Place.find({ where: {} });
        for (const place of places) {
          for (const move of place.moves) {
            if (JSON.stringify(move) === JSON.stringify(lastMove[0])) lastPlace = place;
          }
        }
        delete lastPlace.moves;
        delete lastMove[0].id;
      }

      returns.push({
        name: user.name,
        email: user.email,
        id: user.id,
        userInfection: { infectedDate: user.infectedDate, morning: user.morning },
        lastMove: lastMove.length ? { ...lastMove[0] } : {},
        lastPlace: lastMove.length ? { ...lastPlace } : {},
      });
    }

    return returns;
  }

  async createUser(name, email, password) {
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
      return this.signinUser(user.email, password);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') throw new ConflictException('Email already exists');
      else {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async signinUser(email, password) {
    const user = await User.findOne({ email }, { relations: ['permissions'] });
    if (!user) throw new NotFoundException(`User with ${email} not found`);

    const passwd = await bcrypt.hash(password, user.salt);
    if (!(passwd === user.password)) throw new UnauthorizedException('Wrong password');

    return 'Siker!';
  }

  async iHaveCovid(id: number, date: Date): Promise<string> {
    const user = await User.findOne(id);
    if (!user) throw new NotFoundException(`No user found with id ${id}`);
    const newDate = new Date(date.getTime() + 2000 * 3600);
    user.infectedDate = newDate;
    user.morning = parseInt(newDate.toISOString().substring(11, 13)) < 12;
    try {
      await user.save();
      this.logger.verbose(`infectedDate for user ${user.name} is now updated`);
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
    return '';
  }

  async addPermission(code: string, id: number) {
    const user = await User.findOne(id, { relations: ['permissions'] });
    const perm = await Permission.findOne({ code });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    if (!perm) throw new NotFoundException(`Permission with code ${code} is not found`);

    for (const i of user.permissions) {
      if (i.id === perm.id) return '';
    }
    user.permissions.push(perm);

    try {
      await user.save();
      this.logger.verbose(`${user.id} felhasználónak ${perm.code} jogosultság adva`);
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
  }
  async removePermission(code: string, id: number) {
    const user = await User.findOne(id, { relations: ['permissions'] });
    const perm = await Permission.findOne({ code });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    if (!perm) throw new NotFoundException(`Permission with code ${code} is not found`);

    let hasPermission = false;
    for (const i of user.permissions) {
      if (i.id === perm.id) hasPermission = true;
    }
    if (!hasPermission) return '';

    user.permissions = user.permissions.filter(x => perm.id !== x.id);
    try {
      await user.save();
      this.logger.verbose(`${user.id} felhasználónak ${perm.code} jogosultság eltávolítva`);
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
  }
}
