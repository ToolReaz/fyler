import dbConnect from "../../db/connection";

export default async (req, res) => {
  const db = await dbConnect();

  const { settingKey, settingValue } = req.body;

  if (settingKey === undefined || settingValue === undefined) {
    res.send("Wrong values");
    return;
  }

  try {
    const config = await db.models.Config.findOne({
      where: { key: settingKey },
    });

    if (config) {
      await db.models.Config.update(
        {
          key: settingKey,
          value: settingValue,
        },
        { where: { id: config.dataValues.id } }
      );
    } else {
      await db.models.Config.create({
        key: settingKey,
        value: settingValue,
      });
    }
    res.send("Done");
  } catch (e) {
    console.error(e);
    res.send("An error occured while updating settings.");
  }
  return;
};
