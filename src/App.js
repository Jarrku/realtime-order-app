import React, { Component } from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import styled from "styled-components";

import Drinks from "./pages/Drinks";
import Entrance from "./pages/Entrance";
import Kitchen from "./pages/Kitchen";
import Navbar from "./Navbar";

const { Content } = Layout;

const Container = styled(Layout)`
  min-height: 100vh;
`;

const Main = styled(Content)`
  margin: 24px 16px 0;
`;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Navbar />
          <Layout>
            <Main>
              <Switch>
                <Route path="/entrance" component={Entrance} />
                <Route path="/kitchen" component={Kitchen} />
                <Route path="/drinks" component={Drinks} />
                <Redirect path="/" to="/entrance" />
              </Switch>
            </Main>
          </Layout>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
