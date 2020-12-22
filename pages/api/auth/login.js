import dbConnect from "../../../db/connection";
import { compareSync } from "bcryptjs";

export default async (req, res) => {
  const db = await dbConnect();

  const { username, password } = req.body;

  if (!username || !password) {
    res.statusCode = 401;
    res.end();
    return;
  }

  try {
    const dataValues = await db.models.User.findAll({
      where: { username },
    });

    const user = dataValues[0];

    if (user && !compareSync(password, user.password)) {
      res.statusCode = 404;
      res.end("Wrong password");
      return;
    }

    delete user.password;

    res.statusCode = 200;
    res.json({
      status: "success",
      user,
    });
  } catch (e) {
    console.error(e);
    res.statusCode = 404;
    res.end("Wrong username");
    return;
  }
};
