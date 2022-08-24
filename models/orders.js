'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Customer,{foreignKey:'customer'})
    }
  }
  Orders.init({

    total_amount: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:1
      }
    },
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'orders',
    modelName: 'Orders',
  });
  return Orders;
};