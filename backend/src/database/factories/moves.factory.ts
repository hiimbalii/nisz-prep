import { Move } from '../../moves/entities/move.entity';
import { define, factory } from 'typeorm-seeding';
import { Place } from '../../places/entities/place.entity';
import { User } from '../../users/entities/user.entity';

define(Move, faker => {
  const move = new Move();
  move.date = faker.date.between('2019.10.23 01:00', '2021.05.13 23:59');
  move.morning = faker.random.boolean();
  move.place = factory(Place)() as any;
  move.user = factory(User)() as any;

  return move;
});
