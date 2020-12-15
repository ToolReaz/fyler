let bcrypt = require("bcryptjs");

module.exports = {
  register: async function (req, res) {
    const { User } = this.db.models;

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(401);
      res.send();
      return;
    }

    const { dataValues: user } = await User.create({
      username,
      email,
      password,
    });

    delete user.password;

    res.send({
      status: "success",
      user,
    });
  },

  login: async function (req, res) {
    const { User } = this.db.models;

    const { username, email, password } = req.body;

    if (!username || !password) {
      res.status(401);
      res.send();
      return;
    }

    const { dataValues: user } = await User.findOne({ where: { username } });

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(404);
      res.send("Wrong password");
      return;
    }

    delete user.password;

    res.send({
      status: "success",
      user,
    });
  },
};
