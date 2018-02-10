const Sequelize = require("sequelize");

const db = new Sequelize("kkf", null, null, {
  dialect: "sqlite",
  storage: "./kkf.sqlite",
  logging: false
});

const CategoryModel = db.define("category", {
  name: { type: Sequelize.STRING }
});

const FoodItemModel = db.define("foodItem", {
  name: { type: Sequelize.STRING },
  price: { type: Sequelize.FLOAT }
});

const DrinkModel = db.define("drink", {
  name: { type: Sequelize.STRING },
  price: { type: Sequelize.FLOAT }
});

const OrderModel = db.define("order", {
  name: { type: Sequelize.STRING },
  remark: { type: Sequelize.TEXT },
  status: { type: Sequelize.INTEGER },
  hasSoup: { type: Sequelize.BOOLEAN }
});

const FoodItemsOrderModel = db.define("FoodItemsOrder", {
  amount: { type: Sequelize.INTEGER }
});

FoodItemModel.belongsTo(CategoryModel);
DrinkModel.belongsTo(CategoryModel);

FoodItemModel.belongsToMany(OrderModel, {
  through: FoodItemsOrderModel
});

OrderModel.belongsToMany(FoodItemModel, {
  as: "items",
  through: FoodItemsOrderModel
});

const FoodItemsOrder = db.models.FoodItemsOrder;
const Category = db.models.category;
const FoodItem = db.models.foodItem;
const Drink = db.models.drink;
const Order = db.models.order;

db.sync();

module.exports = {
  FoodItemsOrder,
  Category,
  FoodItem,
  Drink,
  Order
};
