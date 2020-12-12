import { Layout, Menu, Breadcrumb } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header theme="light">
        <div id="logo">
          <Link to="/">
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
            <Link to="/register">S'inscrire</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/login">Me connecter</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: 50 }}>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Flyer &nbsp;-&nbsp; GPL v3 Licence &nbsp;-&nbsp; by ToolReaz
      </Footer>
    </Layout>
  );
}

export default App;
