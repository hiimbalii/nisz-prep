import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayloadDto } from './jwt-payload.dto';
import { User } from './entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET || 'niszIsTheBest123',
    });
  }

  async validate(payload: JwtPayloadDto) {
    const { email } = payload;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException(`No user with email ${email}`);
    }

    return user;
  }
}
