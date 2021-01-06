import { Col, Divider, Row, Switch, Typography } from "antd";
import React from "react";

export default function SettingSwitch({ title, description }) {
  return (
    <Row align="middle">
      <Col span={22}>
        <p><Typography.Text strong>{title}</Typography.Text></p>
        <Typography.Text type="secondary">{description}</Typography.Text>
        <br />
      </Col>
      <Col span={2}>
        <Switch />
      </Col>
      <Divider />
    </Row>
  );
}
