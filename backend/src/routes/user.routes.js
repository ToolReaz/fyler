const CTRL = require("../controllers/userCtrl");

const REGISTER = {
  method: "POST",
  url: "/user/register",
  handler: CTRL.register,
};

const LOGIN = {
  method: "POST",
  url: "/user/login",
  handler: CTRL.login,
};

const GET_LINK = {
  method: "GET",
  url: "/l/:url",
  handler: CTRL.get,
};

module.exports = (server) => {
  server.route(REGISTER);
  server.route(LOGIN);
};
