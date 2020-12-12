import { Button, Card, Input, message, Typography } from "antd";
import React, { useState } from "react";
import { API } from "../libs/api";

export default function CreateLink() {
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");

  const submit = async () => {
    if (url !== "") {
      try {
        const { data } = await API.post("/l", {
          type: "redirect",
          target: url,
        });
        setUrl("");
        setLink("http://localhost:4000/l/" + data.url);
        message.success("Lien crée !");
      } catch (e) {
        console.error(e);
        message.error(e.message);
      }
    }
  };

  return (
    <Card
      title="Create link"
      style={{ margin: "0 auto", maxWidth: 400, textAlign: "center" }}
    >
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
    </Card>
  );
}
