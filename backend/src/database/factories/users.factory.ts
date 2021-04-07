import { User } from '../../users/entities/user.entity';
import { define } from 'typeorm-seeding';
import { genSaltSync, hashSync } from 'bcrypt';

define(User, faker => {
  const salt = genSaltSync();

  const user = new User();
  user.name = faker.name.firstName(0) + ' ' + faker.name.lastName(0);
  user.password = hashSync('Alma', salt);
  user.salt = salt;
  user.email = faker.internet.email();
  user.morning = null;
  user.infectedDate = new Date(0);
  return user;
});
