import React from "react";
import { Button, Form, Card, Input, message, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      await axios.post("/api/auth/login", values);
      form.resetFields();
      router.push("/account");
    } catch (e) {
      console.error(e);
      message.error("Wrong credentials");
    }
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: 600 }}>
      <Card title="Login">
        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
