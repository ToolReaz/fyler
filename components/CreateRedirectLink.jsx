import { Button, Card, Input, message, Spin, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CreateRedirectLink() {
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (url !== "") {
      setLoading(true);
      try {
        const { data } = await axios.post("/api/l/redirect", {
          target: url,
        });
        setUrl("");
        setLink(data.url);
        setLoading(false);
        message.success("Lien crée !");
      } catch (e) {
        setLoading(false);
        message.error(e.message);
      }
    }
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Input
          onChange={(e) => setUrl(e.target.value)}
          bordered={false}
          size="large"
          placeholder="Paste link"
        />
        <br />
        <br />
        <Button
          onClick={submit}
          type="primary"
          size="large"
          style={{ width: "100%" }}
        >
          Create
        </Button>
      </Spin>
      <br />
      <CopyToClipboard
        text={link}
        onCopy={() => {
          message.success("Copied to clipboard !");
        }}
      >
        <Button type="text">{link}</Button>
      </CopyToClipboard>{" "}
    </div>
  );
}
