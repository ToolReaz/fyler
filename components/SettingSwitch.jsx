import { Col, Divider, message, Row, Switch, Typography } from "antd";
import axios from "axios";
import React from "react";

export default function SettingSwitch({ title, description, settingKey }) {
  const update = async (value, event) => {
    try {
      const res = await axios.post("/api/setting", {
        settingKey,
        settingValue: value,
      });
      console.log(res)
      message.success("d");
    } catch (e) {
      console.error(e);
      message.error("An error occured while updating the setting.");
      event.preventDefault();
    }
  };

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
        <Switch onChange={update} />
      </Col>
      <Divider />
    </Row>
  );
}
