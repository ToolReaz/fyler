const { DataTypes, Sequelize } = require("sequelize");

const Config = {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

module.exports = Config;
