import { Card, Tabs } from "antd";
import Head from "next/head";
import CreateImageLink from "../components/CreateImageLink";
import CreateRedirectLink from "../components/CreateRedirectLink";

const { TabPane } = Tabs;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fyler</title>
      </Head>
      <Card
        style={{ margin: "0 auto", maxWidth: 400, textAlign: "center" }}
      >
        <Tabs>
          <TabPane tab="Redirect" key="1">
            <CreateRedirectLink />
          </TabPane>
          <TabPane tab="Image" key="2">
            <CreateImageLink />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
