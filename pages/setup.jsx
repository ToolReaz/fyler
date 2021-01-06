import { Button, Card, Input, Form, Typography, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dbConnect from "../db/connection";

export async function getStaticProps() {
  const db = await dbConnect();
  const x = await db.models.Config.findAll({
    where: {
      key: "isInit",
    },
  });

  if (x[0].dataValues.value === "1") {
    return { props: { isInit: true } };
  }
  return { props: { isInit: false } };
}

export default function setup({ isInit }) {
  const [form] = Form.useForm();
  const [siteName, setSiteName] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (isInit) router.replace("/");
  });

  const finish = async () => {
    try {
      const data = {
        admin: form.getFieldsValue(),
        siteName,
      };
      await axios.post("/api/setup", data);
      router.replace("/");
    } catch (e) {
      console.error(e);
      message.error("Error");
    }
  };

  return (
    <Card title="Setup" style={{ margin: "0 auto", maxWidth: 600 }}>
      <div>
        <Typography.Text strong>Admin credentials</Typography.Text>
        <br />
        <Form form={form} layout="vertical">
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
        </Form>
      </div>
      <br />
      <br />
      <div>
        <Typography.Text strong>Website name</Typography.Text>
        <br />
        <Input
          onChange={(x) => setSiteName(x.target.value)}
          placeholder="Fyler"
          title="Site name"
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <br />
        <br />
        <Button onClick={finish} size="large" type="primary">
          Finish
        </Button>
      </div>
    </Card>
  );
}
