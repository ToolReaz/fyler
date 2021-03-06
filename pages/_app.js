import "../styles/globals.css";

import { Layout, Menu } from "antd";
import Link from "next/link";
import { signIn, useSession } from "next-auth/client";

const { Header, Content, Footer } = Layout;

function MyApp({ Component, pageProps }) {
  const [session, loading] = useSession();

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
          defaultSelectedKeys={[]}
        >
          {session ? (
            <Menu.Item key="1">
              <Link href="/account">
                <a>My account</a>
              </Link>
            </Menu.Item>
          ) : (
            <>
              <Menu.Item key="1">
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <a
                  href={"/api/auth/signin"}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Login
                </a>
              </Menu.Item>
            </>
          )}
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
