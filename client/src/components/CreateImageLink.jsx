import { Button, Card, message, Typography, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { API } from "../libs/api";

export default function CreateImageLink() {
  const [link, setLink] = useState("");

  const handleUpload = async (action) => {
    try {
      let formData = new FormData();

      formData.append("file", action.file);
      formData.append("type", "image");
      formData.append("ext", action.file.type.split("/")[1]);

      const { data } = await API.post("/l/image", formData);

      setLink(data.url);
      message.success("Link created !");
    } catch (e) {
      console.warn(e);
      message.error("Cannot create link.");
    }
  };

  return (
    <Card
      title="Share image"
      style={{ margin: "0 auto", maxWidth: 400, textAlign: "center" }}
    >
      <Upload.Dragger
        itemRender={null}
        multiple={false}
        customRequest={handleUpload}
      >
        <InboxOutlined />
      </Upload.Dragger>
      <br />
      <Typography.Text>{link}</Typography.Text>
    </Card>
  );
}
