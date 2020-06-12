const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Model = Sequelize.Model;

class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
  },
  { sequelize, modelName: "cartItem" }
);

module.exports = CartItem;
