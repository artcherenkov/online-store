const Sequelize = require("sequelize");

const sequelize = new Sequelize("online_shop", "root", "deartercher", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
