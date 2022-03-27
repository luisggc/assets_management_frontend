import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  FundProjectionScreenOutlined,
  TableOutlined,
} from "@ant-design/icons";
import UnitsListPage from "./pages/UnitsListPage";
import CompaniesListPage from "./pages/CompaniesListPage";
import { Route, Routes, Link } from "react-router-dom";
import UsersListPage from "./pages/UsersListPage";
import AssetsListPage from "./pages/AssetsListPage";
import { useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App = () => {
  const pathname = useLocation().pathname;

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          {/*   <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item> */}
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background" breakpoint="lg" collapsedWidth="0">
          <Menu
            mode="inline"
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={[pathname]}
          >
            <Menu.Item icon={<FundProjectionScreenOutlined />} title="Statistics" key="/">
              <Link to="/">Statistics</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<TableOutlined />} title="Tables">
              <Menu.Item key="/companies">
                <Link to="/companies">Companies</Link>
              </Menu.Item>
              <Menu.Item key="/units">
                <Link to="/units">Units</Link>
              </Menu.Item>
              <Menu.Item key="/users">
                <Link to="/users">Users</Link>
              </Menu.Item>
              <Menu.Item key="/assets">
                <Link to="/assets">Assets</Link>
              </Menu.Item>
            </SubMenu>
{/* 
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Units">
              <Menu.Item key="6">option5</Menu.Item>
              <Menu.Item key="7">option6</Menu.Item>
              <Menu.Item key="8">option7</Menu.Item>
              <Menu.Item key="9">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Assets">
              <Menu.Item key="10">option9</Menu.Item>
              <Menu.Item key="111">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<NotificationOutlined />} title="People">
              <Menu.Item key="13">option9</Menu.Item>
              <Menu.Item key="14">option10</Menu.Item>
              <Menu.Item key="15">option11</Menu.Item>
              <Menu.Item key="16">option12</Menu.Item>
            </SubMenu> */}

          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route element={<HomePage />} path="/" exact />
              <Route element={<CompaniesListPage />} path="companies" />
              <Route element={<UnitsListPage />} path="units" />
              <Route element={<UsersListPage />} path="users" />
              <Route element={<AssetsListPage />} path="assets" />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
