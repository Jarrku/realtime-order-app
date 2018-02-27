import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Entrance from "./Entrance";
const MENU_QUERY = gql`
  query Menu {
    menu {
      id
      name
      price
      category {
        name
      }
    }
  }
`;

const withData = graphql(MENU_QUERY, {
  name: "menuReq"
});

export default withData(Entrance);
