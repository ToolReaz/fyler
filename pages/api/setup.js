import dbConnect from "../../db/connection";

export default async (req, res) => {
  const db = await dbConnect();

  const { admin, siteName = "Fyler" } = req.body;

  const x = await db.models.Config.findAll({
    where: {
      key: "isInit",
    },
  });

  if (x[0].dataValues.value === "1") {
    res.send("Site already inited");
    return;
  }

  if (!admin) {
    res.send("No admin credentials supplied");
    return;
  }

  await db.models.Config.create({
    key: "isInit",
    value: "1",
  });
  await db.models.Config.create({
    key: "siteName",
    value: siteName,
  });
  await db.models.User.create({
    ...admin,
    role: "admin",
  });

  res.redirect("/");
};
