import { Button, Col, Divider, Row, Typography } from "antd";
import React from "react";

export default function SettingButton({ title, description, button, onClick }) {
  return (
    <Row align="middle">
      <Col span={22}>
        <p>
          <Typography.Text strong>{title}</Typography.Text>
        </p>
        <Typography.Text type="secondary">{description}</Typography.Text>
        <br />
      </Col>
      <Col span={2}>
        <Button onClick={onClick} type="default" danger>
          {button}
        </Button>
      </Col>
      <Divider />
    </Row>
  );
}
