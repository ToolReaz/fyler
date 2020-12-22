import Head from "next/head";
import CreateImageLink from "../components/CreateImageLink";
import CreateRedirectLink from "../components/CreateRedirectLink";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fyler</title>
      </Head>
      <div style={{ margin: "0 auto" }}>
        <CreateRedirectLink />
        <hr />
        <CreateImageLink />
      </div>
    </div>
  );
}
