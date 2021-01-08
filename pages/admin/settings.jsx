import { Button, Card, Collapse, message } from "antd";
import React from "react";
import SettingButton from "../../components/SettingButton";
import SettingSwitch from "../../components/SettingSwitch";

const { Panel } = Collapse;

export default function settings() {
  const deleteAllLinks = async () => {
    message.warning("Not implemented yet");
  };

  const deleteAllAccounts = async () => {
    message.warning("Not implemented yet");
  };

  return (
    <Card title="Settings">
      <Collapse ghost defaultActiveKey={[1, 2, 3]}>
        <Panel key={1} header="General"></Panel>
        <Panel key={2} header="Features">
          <SettingSwitch
            title="Anonymous link"
            description="Enable non logged user to create link."
            settingKey="enableAnonymousLink"
          />
          <SettingSwitch
            title="Redirect link"
            description="Whether or not enable the creation of redirection link."
            settingKey="enableRedirectLink"
          />
          <SettingSwitch
            title="Image link"
            description="Whether or not enable the creation of image link."
            settingKey="enableImageLink"
          />
        </Panel>
        <Panel key={3} header="Danger zone">
          <SettingButton
            title="Delete all links"
            description="Delete all created links. This operation is not reversible !"
            button="Delete"
            onClick={deleteAllLinks}
          />
          <SettingButton
            title="Delete all users"
            description="Delete all user accounts (except admin accounts). This operation is not reversible !"
            button="Delete"
            onClick={deleteAllAccounts}
          />
        </Panel>
      </Collapse>
    </Card>
  );
}
