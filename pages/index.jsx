import { Card, Tabs } from "antd";
import Head from "next/head";
import Link from "next/link";
import CreateImageLink from "../components/CreateImageLink";
import CreateRedirectLink from "../components/CreateRedirectLink";
import dbConnect from "../db/connection";

const { TabPane } = Tabs;

export async function getStaticProps() {
  const db = await dbConnect();
  const configs = await db.models.Config.findAll({
    attributes: ["key", "value"],
    where: {
      key: ["enableRedirectLink", "enableImageLink"],
    },
  });

  let config = {};
  if (configs) {
    configs.forEach((x) => {
      config[x.dataValues.key] = x.dataValues.value;
    });
  }

  console.log(config);

  return { props: { config }, revalidate: 1 };
}

export default function Home({ config }) {
  return (
    <div>
      <Head>
        <title>Fyler</title>
      </Head>
      <Card style={{ margin: "0 auto", maxWidth: 400, textAlign: "center" }}>
        <Tabs>
          {config.enableRedirectLink != "0" && (
            <TabPane tab="Redirect" key="1">
              <CreateRedirectLink />
            </TabPane>
          )}
          {config.enableImageLink != "0" && (
            <TabPane tab="Image" key="2">
              <CreateImageLink />
            </TabPane>
          )}
        </Tabs>
      </Card>
    </div>
  );
}
