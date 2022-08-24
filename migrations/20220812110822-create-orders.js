'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customer_id:{
        type : DataTypes.INTEGER,
        allowNull:false,
        references : { model : 'customers' , primaryKey: 'id'}
      },
      total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
    await queryInterface.dropTable('orders');
  }
};