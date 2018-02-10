const {
  Category,
  FoodItem,
  Drink,
  Order,
  FoodItemsOrder
} = require("./connectors");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const ORDER_ADDED = "orderAdded";
const ORDER_UPDATED = "orderUpdated";

const includeAll = {
  include: [
    {
      all: true
    }
  ]
};

const mapOrderItems = ({ id, name, price, FoodItemsOrder: { amount } }) => ({
  item: {
    id,
    name,
    price
  },
  amount: amount
});

const resolvers = {
  Query: {
    orders(_, args) {
      return Order.findAll({
        include: [
          {
            model: FoodItem,
            as: "items"
          }
        ],
        joinTableAttributes: ["amount"]
      }).then(orders => {
        return orders.map(order => {
          order.items = order.items.map(mapOrderItems);
          return order;
        });
      });
    },
    menu(_, args) {
      return FoodItem.findAll(includeAll);
    },
    drinks(_, args) {
      return Drink.findAll(includeAll);
    },
    categories(_, args) {
      return Category.findAll(includeAll);
    }
  },
  Mutation: {
    addFoodItem: (root, { foodItem: { name, price, categoryId } }) => {
      return FoodItem.create({
        name: name,
        price: price,
        categoryId: categoryId
      });
    },
    removeFoodItem: (root, { id }) => {
      return FoodItem.findById(id).then(foodItem => foodItem.destroy());
    },
    addDrink: (root, { drink: { name, price, categoryId } }) => {
      return Drink.create({
        name: name,
        price: price,
        categoryId: categoryId
      });
    },
    removeDrink: (root, { id }) => {
      return Drink.findById(id).then(drink => drink.destroy());
    },
    addCategory: (root, { category: { name } }) => {
      return Category.create({
        name: name
      });
    },
    addOrder: (root, { order: { name, remark, hasSoup, items } }) => {
      return Order.create({
        name: name,
        status: 0,
        remark: remark,
        hasSoup: hasSoup
      }).then(order => {
        return FoodItem.findAll({
          where: {
            id: items.map(({ id }) => id)
          }
        }).then(foodItems => {
          const updatesPending = Promise.all(
            foodItems.map(async dbFoodItem => {
              const { amount } = items.find(({ id }) => id === dbFoodItem.id);
              return order.addItems(dbFoodItem, {
                through: { amount: amount }
              });
            })
          );
          return updatesPending.then(() => {
            return order
              .save()
              .then(parseOrderObject)
              .then(parsedOrder => {
                pubsub.publish(ORDER_ADDED, { orderAdded: parsedOrder });
                return parsedOrder;
              });
          });
        });
      });
    },
    updateOrder: (root, { order: { id, hasSoup, status } }) => {
      const fieldsToUpdate = [];
      if (hasSoup !== undefined) fieldsToUpdate.push("hasSoup");
      if (status !== undefined) fieldsToUpdate.push("status");

      return Order.findById(id).then(order => {
        return order
          .update(
            {
              hasSoup: hasSoup,
              status: status
            },
            { fields: fieldsToUpdate }
          )
          .then(parseOrderObject)
          .then(parsedOrder => {
            pubsub.publish(ORDER_UPDATED, { orderUpdated: parsedOrder });
            return parsedOrder;
          });
      });
    }
  },
  Subscription: {
    orderAdded: {
      subscribe: () => pubsub.asyncIterator(ORDER_ADDED)
    },
    orderUpdated: {
      subscribe: () => pubsub.asyncIterator(ORDER_UPDATED)
    }
  }
};

const parseOrderObject = ({ id }) => {
  return Order.find({
    where: {
      id: id
    },
    include: [
      {
        model: FoodItem,
        as: "items"
      }
    ],
    joinTableAttributes: ["amount"]
  }).then(fetchedOrder => {
    fetchedOrder.items = fetchedOrder.items.map(mapOrderItems);
    return fetchedOrder;
  });
};

module.exports = resolvers;
