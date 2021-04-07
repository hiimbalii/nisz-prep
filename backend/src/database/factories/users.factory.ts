import { User } from '../../users/entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, faker => {
  const user = new User();
  user.name = faker.name.firstName(0) + ' ' + faker.name.lastName(0);
  user.password = '$2b$10$D9yig7ijBipBTZO4aSw8wO4SSI5L1tlqPcKwQ3jQa8UldL/4sYGJa';
  user.salt = '$2b$10$D9yig7ijBipBTZO4aSw8wO';
  user.email = faker.internet.email();
  user.morning = null;
  user.infectedDate = new Date(0);
  return user;
});
