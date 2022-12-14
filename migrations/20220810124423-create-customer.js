'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      phone: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique : true
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false        
      },
      status: {
        type: DataTypes.BOOLEAN,
        default : true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('customers');
  }
};