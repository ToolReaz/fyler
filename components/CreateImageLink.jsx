import { Button, Card, message, Spin, Typography, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CreateImageLink() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (action) => {
    setLoading(true);
    try {
      let formData = new FormData();

      formData.append("file", action.file);
      formData.append("type", "image");
      formData.append("ext", action.file.type.split("/")[1]);

      const { data } = await axios.post("/api/l/image", formData);

      setLink(data.url);
      setLoading(false);
      message.success("Link created !");
    } catch (e) {
      setLoading(false);
      message.error("Cannot create link.");
    }
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Upload.Dragger
          listType="picture"
          multiple={false}
          showUploadList={false}
          customRequest={handleUpload}
        >
          <InboxOutlined />
        </Upload.Dragger>
      </Spin>
      <br />
      <CopyToClipboard
        text={link}
        onCopy={() => {
          message.success("Copied to clipboard !");
        }}
      >
        <Button type="text">{link}</Button>
      </CopyToClipboard>
    </div>
  );
}
