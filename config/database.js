import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('eventos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;
