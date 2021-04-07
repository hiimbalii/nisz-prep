import { Place } from '../../places/entities/place.entity';
import { define } from 'typeorm-seeding';

define(Place, faker => {
  const place = new Place();
  place.latitude = faker.random.number({ min: -900000, max: 900000 }) / 10000;
  place.longitude = faker.random.number({ min: -1800000, max: 1800000 }) / 10000;

  return place;
});
