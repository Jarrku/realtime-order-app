const { SubscriptionServer } = require("subscriptions-transport-ws");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const schema = require("./data/schema");

const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const cors = require("cors");

const PORT = 4000;
const server = express();

server.use("*", cors({ origin: "http://localhost:3000" }));

server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);

server.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
  })
);

// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: ws,
      path: "/subscriptions"
    }
  );
});
