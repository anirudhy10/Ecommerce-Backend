'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associationss
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
          Category.hasMany(models.Product,{foreignKey:'category',as:'product'})
    }
  }
  Category.init({
    cate_name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    cate_status: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'categories',
    modelName: 'Category',
  });
  return Category;
};