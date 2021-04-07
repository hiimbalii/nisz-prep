import { User } from '../../users/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { hashSync, genSaltSync } from 'bcrypt';
import { Permission } from '../../permissions/entities/permission.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const salt = genSaltSync();
    const admin = new User();
    admin.id = 1;
    admin.name = 'Admin';
    admin.email = 'nisz@mo.hu';
    admin.infectedDate = new Date(0);
    admin.morning = null;
    admin.salt = salt;
    admin.password = hashSync('admin', salt);
    admin.permissions = [];
    admin.permissions.push(
      await connection.getRepository(Permission).findOne({ where: { code: 'ADMIN' } }),
    );

    const vals = await factory(User)().createMany(10);

    try {
      await admin.save();
      await connection.createQueryBuilder().insert().into(User).values(vals).execute();
    } catch (err) {
      if (err.sqlMessage !== "Duplicate entry '1' for key 'PRIMARY'") console.log(err);
    }
  }
}
