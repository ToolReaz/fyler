const { default: fastify } = require("fastify");

require("dotenv").config();

const server = require("fastify")({ logger: true });

server.get('/', (req, res) => {
    res.send("Hello World !")
});

server.listen(process.env.PORT || 3000, (err, address) => {
  if (err) throw err;
  server.log.info(`Server running and listening on address ${address} !`);
});

module.exports = server;
