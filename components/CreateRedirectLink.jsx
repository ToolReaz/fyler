import { Button, Card, Input, message, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";

export default function CreateRedirectLink() {
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");

  const submit = async () => {
    if (url !== "") {
      try {
        const { data } = await axios.post("/api/l/redirect", {
          target: url,
        });
        setUrl("");
        setLink(data.url);
        message.success("Lien crée !");
      } catch (e) {
        console.error(e);
        message.error(e.message);
      }
    }
  };

  return (
    <div>
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
      <br />
      <br />
      <Typography.Text>{link}</Typography.Text>
    </div>
  );
}
