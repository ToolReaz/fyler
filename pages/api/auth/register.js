import dbConnect from "../../../db/connection";

export default async (req, res) => {
  const db = await dbConnect();

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.statusCode = 401;
    res.end();
    return;
  }

  const user = await db.models.User.create({
    username,
    email,
    password,
  });
  console.log(user)

  delete user.password;

  res.json({
    status: "success",
    user,
  });

  return;
};
