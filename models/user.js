const Sequelize = require("sequelize");

const Model = Sequelize.Model;
const sequelize = require("../util/database");

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  { sequelize, modelName: "user" }
);

module.exports = User;
