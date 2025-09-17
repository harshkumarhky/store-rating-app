const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING(400), allowNull: true },
    role: { type: DataTypes.ENUM('SYSTEM_ADMIN','NORMAL_USER','STORE_OWNER'), defaultValue: 'NORMAL_USER' },
    rating: { type: DataTypes.FLOAT, allowNull: true }
  }, { timestamps: true });
};
