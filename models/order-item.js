const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Model = Sequelize.Model;

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
  },
  { sequelize, modelName: "orderItem" }
);

module.exports = OrderItem;
