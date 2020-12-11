const { fastify } = require("fastify");

// Create HTTP server
const server = require("fastify")({ logger: true });

// Load env config
require("dotenv").config();

// Set env vars or defaults
const DB_NAME = process.env.DB_NAME || "fyler";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "root";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_TYPE = process.env.DB_TYPE || "mariadb";

// Register middlewares
server.register(require("fastify-compress"));
server.register(require("fastify-cors"), {
  origin: "*",
});
server.register(require("fastify-cookie"), {
  secret: "my-secret",
});
server.register(require("fastify-helmet"), {
  hidePoweredBy: { setTo: "Potatoes" },
});

server.get("/", (req, res) => {
  res.send("Hello World !");
});

// Database
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: DB_TYPE,
  host: DB_HOST,
});
const fs = require("fs");
const path = require("path");
fs.readdirSync(path.join(__dirname, "models")).forEach((file) => {
  let name = file.replace("Model.js", "");
  sequelize.define(name, require(path.join(__dirname, "models", file)));
});

(async () => {
  try {
    await server.listen(process.env.PORT || 3000);
    server.log.info(`Server running !`);

    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch (e) {
    server.log.error(e);
  }
})();

module.exports = server;
