const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `
scalar Date

type Query {
  orders: [Order]
  menu: [FoodItem]
  drinks: [Drink]
  categories: [Category]
}

type Mutation {
  addFoodItem(foodItem: FoodItemInput!): FoodItem
  removeFoodItem(id: Int!): FoodItem

  addDrink(drink: DrinkInput!): Drink
  removeDrink(id: Int!): Drink

  addCategory(category: CategoryInput!): Category

  addOrder(order: OrderInput!): Order
  updateOrder(order: OrderUpdate): Order
}

type Subscription {
  orderAdded: Order
  orderUpdated: Order
}

type Category {
  id: Int!
  name: String!
}

input CategoryInput {
  name: String!
}

type FoodItem {
  id: Int!
  name: String!
  price: Float!
  category: Category
}

input FoodItemInput { 
  name: String!
  price: Float!
  categoryId: Int
}


type Order {
  id: Int!
  name: String!
  remark: String
  hasSoup: Boolean!
  status: Int!
  createdAt: Date!
  updatedAt: Date!
  items: [FoodItemOrder]
}

type FoodItemOrder {
  item: FoodItemOrderData!
  amount: Int!
}

type FoodItemOrderData {
  id: Int!
  name: String!
  price: Float!
}

input OrderUpdate {
  id: Int!
  hasSoup: Boolean
  status: Int
}

input OrderInput {
  name: String!
  remark: String,
  hasSoup: Boolean!
  items: [FoodItemInputOrder!]!
}

input FoodItemInputOrder {
  id: Int!
  amount: Int!
}

type Drink {
  id: Int!
  name: String!
  price: Float!
  category: Category
}

input DrinkInput {
  name: String!
  price: Float!
  categoryId: Int
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
