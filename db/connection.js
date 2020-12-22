import Link from "./models/LinkModel";
import User from "./models/UserModel";

const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
//require("dotenv").config();

let connected = false;
let db = {};

async function dbConnect() {
  if (connected) return db;

  db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      dialect: process.env.DB_TYPE,
      host: process.env.DB_HOST,
    }
  );

  db.define("User", User);
  db.define("Link", Link);

  await db.authenticate();
  await db.sync({ force: true });

  connected = true;
  return db;
}

export default dbConnect;
