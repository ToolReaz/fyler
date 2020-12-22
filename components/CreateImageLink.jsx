import { Card, message, Typography, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import axios from "axios";

export default function CreateImageLink() {
  const [link, setLink] = useState("");

  const handleUpload = async (action) => {
    try {
      let formData = new FormData();

      formData.append("file", action.file);
      formData.append("type", "image");
      formData.append("ext", action.file.type.split("/")[1]);

      const { data } = await axios.post("/api/l/image", formData);

      setLink(data.url);
      message.success("Link created !");
    } catch (e) {
      console.warn(e);
      message.error("Cannot create link.");
    }
  };

  return (
    <div>
      <Upload.Dragger
        itemRender={null}
        multiple={false}
        customRequest={handleUpload}
      >
        <InboxOutlined />
      </Upload.Dragger>
      <br />
      <Typography.Text>{link}</Typography.Text>
    </div>
  );
}
