'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require("../config/db.config")
const db = {};

const sequelize = new Sequelize(
  config[env].DB,
  config[env].USER,
  config[env].PASSWORD,
  {
    host: config[env].HOST,
    dialect: config[env].dialect,
    operatorsAliases: false,
    pool: {
      // max: config.pool.max,
      // min: config.pool.min,
      //acquire: config.pool.acquire,
      // idle: config.pool.idle
    }
  }
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../api/User/user.model")(sequelize, Sequelize);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
