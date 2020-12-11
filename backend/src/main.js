const { fastify } = require("fastify");

// Load env config
require("dotenv").config();

// Register middlewares
fastify.register(require("fastify-compress"));
fastify.register(require("fastify-cors"), {
  origin: "*",
});
fastify.register(require("fastify-cookie"), {
  secret: "my-secret",
});
fastify.register(require("fastify-helmet"), {
  hidePoweredBy: { setTo: "Potatoes" },
});

const server = require("fastify")({ logger: true });

server.get("/", (req, res) => {
  res.send("Hello World !");
});

server.listen(process.env.PORT || 3000, (err, address) => {
  if (err) throw err;
  server.log.info(`Server running and listening on address ${address} !`);
});

module.exports = server;
