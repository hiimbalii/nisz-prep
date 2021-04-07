import { User } from '../../users/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { hashSync, genSaltSync } from 'bcrypt';
import { Permission } from '../../permissions/entities/permission.entity';

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
    admin.permissions = [];
    admin.permissions.push(permission);

    try {
      await admin.save();
    } catch (err) {
      if (err.errno !== 1062) console.log(err);
    }
  }
}
