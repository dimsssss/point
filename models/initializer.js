'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config.json')[env];

const createDefaultDBInstance = () => {
  return {
    Sequelize,
    sequelize: createConnection()
  }
}

module.exports = () => {
    const db = createDefaultDBInstance()
    initModels(db)
    initAssociations(db)
    return Object.freeze(db)
}

const createConnection = () => {
    try {
        return new Sequelize(config.database, config.username, config.password, config);
    } catch (err) {
        throw err
    }
}

const initModels = (db) => {
    fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(db.sequelize, db.Sequelize.DataTypes);
    db[model.name] = model;
  });
}

const initAssociations = (db) => {
    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
}
