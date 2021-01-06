import { Card, Tabs } from "antd";
import Head from "next/head";
import Link from "next/link";
import CreateImageLink from "../components/CreateImageLink";
import CreateRedirectLink from "../components/CreateRedirectLink";
import dbConnect from "../db/connection";

const { TabPane } = Tabs;

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
  return { props: { isInit: false }, revalidate: 30 };
}

export default function Home({ isInit }) {
  return (
    <div>
      <Head>
        <title>Fyler</title>
      </Head>
      {!isInit && (
        <Link href="/setup">
          <center>
            <a>
              It looks like it's the first time you launch Fyler !
              <br />
              Click here to configure the app.
              <br />
              <br />
            </a>
          </center>
        </Link>
      )}
      <Card style={{ margin: "0 auto", maxWidth: 400, textAlign: "center" }}>
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
