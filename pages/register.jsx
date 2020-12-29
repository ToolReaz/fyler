import React from "react";
import { Button, Form, Card, Input, message, Typography } from "antd";
import axios from "axios";

export default function Register() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      if (values.password === values.checkPassword) {
        const { data } = await axios.post("/api/auth/register", values);
        message.success("Register success");
        form.resetFields();
      } else {
        message.error("Passwords doesn't match");
      }
    } catch (e) {
      message.error("Wrong credentials");
    }
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: 600 }}>
      <Card title="Register">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
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
          <Form.Item
            label="Check password"
            name="checkPassword"
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
