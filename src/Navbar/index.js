import React from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";

const { Sider } = Layout;

class Navbar extends React.Component {
  state = {
    collapsed: false,
    initialNav: [this.props.location.pathname]
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  onClick = ({ key }) => this.props.history.push(`${key}`);

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={this.state.initialNav}
          mode="inline"
          onClick={this.onClick}
        >
          <Menu.ItemGroup key="mainNav" title="KKF">
            <Menu.Item key="/entrance">
              <Icon type="pie-chart" /> <span>Entrance</span>
            </Menu.Item>
            <Menu.Item key="/drinks">
              <Icon type="desktop" />
              <span>Drinks</span>
            </Menu.Item>
            <Menu.Item key="/kitchen">
              <Icon type="pie-chart" />
              <span>Kitchen</span>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Navbar);
