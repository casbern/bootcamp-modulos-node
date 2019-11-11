import Sequelize, {
  Model
} from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL, //virtual means it will only exist here not in the databse.
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      //hooks sao trechos de codigo  que sao executados de forma automatica baseado em acoes que acontecem no nosso modulo.

      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
