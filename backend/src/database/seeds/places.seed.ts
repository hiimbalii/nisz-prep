import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Place } from '../../places/entities/place.entity';

export default class CreatePlace implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const vals = await factory(Place)().createMany(10);

    try {
      await connection.createQueryBuilder().insert().into(Place).values(vals).execute();
    } catch (err) {
      if (err.sqlMessage !== "Duplicate entry '1' for key 'PRIMARY'") console.log(err);
    }
  }
}
