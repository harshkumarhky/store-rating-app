const { Sequelize } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false
});

const User = require('./user')(sequelize);
const Store = require('./store')(sequelize);
const Rating = require('./rating')(sequelize);

// Associations
User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating, { foreignKey: 'storeId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

module.exports = { sequelize, User, Store, Rating };
