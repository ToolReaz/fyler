// Dependencies
const { fastify } = require("fastify");
const fs = require("fs");
const path = require("path");

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
server.register(require("fastify-cors"));
server.register(require('fastify-multipart'))
server.register(require("fastify-cookie"), {
  secret: "my-secret",
});
server.register(require("fastify-helmet"), {
  hidePoweredBy: { setTo: "Potatoes" },
  contentSecurityPolicy: false,
});

// Database
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: DB_TYPE,
  host: DB_HOST,
});
fs.readdirSync(path.join(__dirname, "models")).forEach((file) => {
  let name = file.replace("Model.js", "");
  let model = require(path.join(__dirname, "models", file));
  sequelize.define(name, model);
});

// Decorate DB
server.decorate("db", sequelize);

// Routes
fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
  require(path.join(__dirname, "routes", file))(server);
  server.log.info("Registered routes for " + file.replace(".routes.js", ""));
});
server.register(require("fastify-static"), {
  root: path.join(__dirname, "..", "..", "client", "build"),
  prefix: "/*",
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    await server.listen(process.env.PORT || 4000, "0.0.0.0");
    server.log.info(`Server running !`);
  } catch (e) {
    server.log.error(e);
  }
})();

server.stop = async () => {
  await sequelize.close();
  await server.close();
};

module.exports = server;
