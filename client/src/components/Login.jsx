import React from "react";
import { Button, Form, Card, Input, message, Typography } from "antd";
import { API } from "../libs/api";

export default function Login() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const { data } = await API.post("/user/login", values);
      console.log(data);
      message.success("Login success");
      form.resetFields();
    } catch (e) {
      message.error("Wrong credentials");
    }
  };

  return (
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
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
