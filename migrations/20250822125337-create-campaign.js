'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Campaigns', {
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
            title: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            description: {
              type: Sequelize.TEXT,
              allowNull: true,
            },
            funding_goal: {
              type: Sequelize.DECIMAL(15, 2),
              allowNull: false,
              validate: { min: 0.01 },
            },
            current_funds: {
              type: Sequelize.DECIMAL(15, 2),
              allowNull: false,
              defaultValue: 0.00,
              validate: { min: 0 },
            },
            deadline: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            status: {
              type: Sequelize.ENUM('active', 'successful', 'failed'),
              allowNull: false,
              defaultValue: 'active',
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
    await queryInterface.dropTable('Campaigns');
  }
};