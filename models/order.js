const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Model = Sequelize.Model;

class Order extends Model {}

Order.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "order" }
);

module.exports = Order;
