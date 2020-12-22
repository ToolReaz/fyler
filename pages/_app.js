import "../styles/globals.css";

import { Layout, Menu } from "antd";
import Link from "next/link";

const { Header, Content, Footer } = Layout;

function MyApp({ Component, pageProps }) {
  //return <Component {...pageProps} />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header theme="light">
        <div id="logo">
          <Link href="/">
            <h1 style={{ color: "#FFF" }}>Fyler</h1>
          </Link>
        </div>
        <Menu
          style={{ float: "right" }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[0]}
        >
          <Menu.Item key="1">
            <Link href="/register">S'inscrire</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/login"><a>Me connecter</a></Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: 50 }}>
        <Component {...pageProps} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Flyer &nbsp;-&nbsp; GPL v3 Licence &nbsp;-&nbsp; by ToolReaz
      </Footer>
    </Layout>
  );
}

export default MyApp;
