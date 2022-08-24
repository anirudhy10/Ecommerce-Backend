'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasOne(models.Cart,{foreignKey:'customer',as:'cart'})
      Customer.hasMany(models.Cart,{foreignKey:'customer',as:'order'})
    }
  }
  Customer.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{ msg:"Customer Name not Found"},
        notEmpty:{ msg:"Customer Name cannot be empty"}
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull:{ msg:"Customer Email not Found"},
        notEmpty:{ msg:"Customer Email cannot be empty"}
      }
    },
    phone: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{ msg:"Customer Name not Found"},
        notEmpty:{ msg:"Customer Name cannot be empty"}
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{ msg:"Customer Name not Found"},
        notEmpty:{ msg:"Customer Name cannot be empty"},
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName:'customers',
    modelName: 'Customer',
  });
  return Customer;
};