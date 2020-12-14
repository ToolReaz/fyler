const crypto = require("crypto");

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

module.exports = {
  get: async function (req, res) {
    const { url } = req.params;

    if (!url || url === "") return "No url found";

    const link = await this.db.models.Link.findOne({ where: { url } });
    if (link) {
      if (link.dataValues.type === "redirect") {
        res.redirect(link.dataValues.target);
      } else {
        res.status(501);
        res.send();
      }
    }

    return "No matching url found";
  },

  create: async function (req, res) {
    const { type } = req.body;
    if (type === "redirect") {
      const { target } = req.body;
      if (!target || target === "") return "No url supplied";

      const code = crypto.randomBytes(8).toString("hex");
      const link = await this.db.models.Link.create({
        type,
        target,
        code,
      });
      return { status: "success", code, url: BASE_URL + "/l/" + code };
    }

    res.status(501);
    res.send();
  },
};
