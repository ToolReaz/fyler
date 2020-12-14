const CTRL = require("../controllers/linkCtrl");

const CREATE_REDIRECT_LINK = {
  method: "POST",
  url: "/l/redirect",
  handler: CTRL.createRedirect,
};

const CREATE_IMAGE_LINK = {
  method: "POST",
  url: "/l/image",
  handler: CTRL.createImage,
};

const GET_LINK = {
  method: "GET",
  url: "/l/:url",
  handler: CTRL.get,
};

module.exports = (server) => {
  server.route(CREATE_REDIRECT_LINK);
  server.route(CREATE_IMAGE_LINK);
  server.route(GET_LINK);
};
