const { DataTypes, Sequelize } = require("sequelize");
const crypto = require("crypto");
let bcrypt = require("bcryptjs");

const Link = {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    set() {
      return crypto.randomBytes(8).toString("hex");
    },
    unique: true,
  },
  target: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hash = bcrypt.hashSync(value, 8);
      this.setDataValue("password", hash);
    },
  },
};

module.exports = Link;
