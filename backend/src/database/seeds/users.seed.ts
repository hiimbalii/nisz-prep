import { User } from '../../users/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { hashSync, genSaltSync } from 'bcrypt';
import { Permission } from '../../permissions/entities/permission.entity';
import { Move } from '../../moves/entities/move.entity';
import { random } from 'faker';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const salt = genSaltSync();
    const permission = await connection
      .getRepository(Permission)
      .findOne({ where: { code: 'ADMIN' } });

    const admin = new User();
    admin.id = 1;
    admin.name = 'Admin';
    admin.email = 'nisz@mo.hu';
    admin.infectedDate = new Date(0);
    admin.morning = null;
    admin.salt = salt;
    admin.password = hashSync('admin', salt);
    admin.permissions = [permission];
    await admin.save();

    await factory(User)()
      .map(async (user: User) => {
        const moves = await factory(Move)().createMany(random.number({ min: 1, max: 10 }));

        user.moves = moves;
        return user;
      })
      .createMany(3);
  }
}
