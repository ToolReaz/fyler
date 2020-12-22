import dbConnect from "../../../db/connection";
import { randomBytes } from "crypto";

export default async (req, res) => {
  const db = await dbConnect();

  const { target, password = "" } = req.body;

  if (!target || target === "") {
    res.send("No url supplied");
    return;
  }

  const code = randomBytes(8).toString("hex");
  await db.models.Link.create({
    type: "redirect",
    target,
    code,
    password,
  });

  res.statusCode = 200;
  res.json({ status: "success", code, url: process.env.BASE_URL + "/l/" + code });
};
