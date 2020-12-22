import dbConnect from "../../../db/connection";
import { randomBytes } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const db = await dbConnect();

  const form = new IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, { file }) => {
    const code = randomBytes(8).toString("hex");
    const imagePath = join("/tmp", code + "." + fields.ext.value);

    writeFileSync(imagePath, readFileSync(file.path));

    await db.models.Link.create({
      type: "image",
      target: imagePath,
      code,
    });

    res.json({
      status: "success",
      code,
      url: process.env.BASE_URL + "/l/" + code,
    });
  });
};
