const crypto = require("crypto");

module.exports = {
  get: (req, res) => {},

  create: async function (req, res) {
    const { type } = req.body;

    if (type === "redirect") {
      const { target } = req.body;
      if (!target || target === "") return "No url supplied";

      const url = crypto.randomBytes(8).toString("hex");
      const link = await this.db.models.Link.create({ type, target, url });
      return { status: "success", url: link.url };
    }

    return "Type not supported yet";
  },
};
