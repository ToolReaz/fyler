const { DataTypes, Sequelize } = require("sequelize");
let bcrypt = require("bcryptjs");

const Link = {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  target: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    set(value) {
      const hash = bcrypt.hashSync(value, 8);
      this.setDataValue("password", hash);
    },
  },
};

module.exports = Link;
