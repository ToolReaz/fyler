const CTRL = require("../controllers/linkCtrl");

const CREATE_LINK = {
  method: "POST",
  url: "/l",
  handler: CTRL.create,
};

const GET_LINK = {
  method: "GET",
  url: "/l/:url",
  handler: CTRL.get,
};

module.exports = (server) => {
  server.route(CREATE_LINK);
  server.route(GET_LINK);
};
