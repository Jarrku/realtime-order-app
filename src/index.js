import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import App from "./App";

import {
  InMemoryCache,
  ApolloClient,
  ApolloLink,
  split,
  HttpLink
} from "apollo-boost";

import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloProvider } from "react-apollo";

import * as serviceWorker from "./serviceWorker";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache()
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById("root"));

serviceWorker.register();
