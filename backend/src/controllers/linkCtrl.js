const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const util = require("util");
const { pipeline } = require("stream");
const pump = util.promisify(pipeline);

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

module.exports = {
  get: async function (req, res) {
    const { url } = req.params;

    if (!url || url === "") return "No url found";

    const link = await this.db.models.Link.findOne({ where: { code: url } });
    if (link) {
      switch (link.dataValues.type) {
        case "redirect":
          res.redirect(link.dataValues.target);
          break;
        case "image":
          res.send(fs.readFileSync(link.dataValues.target));
          break;
        default:
          res.status(501);
          res.send();
          break;
      }
    }

    return "No matching url found";
  },

  createRedirect: async function (req, res) {
    const { Link } = this.db.models;
    const { target, password = "" } = req.body;

    if (!target || target === "") {
      res.send("No url supplied");
      return;
    }

    const code = crypto.randomBytes(8).toString("hex");
    await Link.create({
      type: "redirect",
      target,
      code,
      password,
    });
    res.send({ status: "success", code, url: BASE_URL + "/l/" + code });
  },

  createImage: async function (req, res) {
    const { Link } = this.db.models;
    const data = await req.file();

    const code = crypto.randomBytes(8).toString("hex");
    const imagePath = path.join(
      __dirname,
      "..",
      "images",
      code + "." + data.fields.ext.value
    );

    await pump(data.file, fs.createWriteStream(imagePath));

    await Link.create({
      type: "image",
      target: imagePath,
      code,
    });
    res.send({ status: "success", code, url: BASE_URL + "/l/" + code });
  },
};
