const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Rating', {
    score: { type: DataTypes.INTEGER, allowNull: false, validate: { min:1, max:5 } },
    comment: { type: DataTypes.STRING(500), allowNull: true }
  }, { timestamps: true });
};
