'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transaction_logs', {
            id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
            },
            user_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: { 
                model: 'Users',
                key: 'id' 
              },
              onDelete: 'cascade'
            },
            pledge_id: {
              type: Sequelize.INTEGER,
              allowNull: true,
              references: { 
                model: 'Pledges',
                key: 'id' 
              },
              onDelete: 'SET NULL'
            },
            amount: {
              type: Sequelize.DECIMAL(15, 2),
              allowNull: false,
            },
            type: {
              type: Sequelize.ENUM('pledge', 'refund', 'deposit'),
              allowNull: false,
            },
            created_at: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            updated_at: {
              type: Sequelize.DATE,
              allowNull: false,
            },
          });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transaction_logs');
  }
};