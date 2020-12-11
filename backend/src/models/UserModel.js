const { DataTypes, Sequelize } = require("sequelize");
let bcrypt = require("bcryptjs");

const User = {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    min: 8,
    set(value) {
      const hash = bcrypt.hashSync(value, 8);
      this.setDataValue("password", hash);
    },
  },
  role: {
    type: DataTypes.STRING,
    default: "user",
    allowNull: false,
  },
};

module.exports = User;
