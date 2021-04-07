import { Move } from '../../moves/entities/move.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreatePlace implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const vals = await factory(Move)().createMany(10);

    try {
      await connection.createQueryBuilder().insert().into(Move).values(vals).execute();
    } catch (err) {
      if (err.sqlMessage !== "Duplicate entry '1' for key 'PRIMARY'") console.log(err);
    }
  }
}
