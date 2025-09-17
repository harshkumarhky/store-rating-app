const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Store', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } },
    address: { type: DataTypes.STRING(400), allowNull: true },
  }, { timestamps: true });
};
