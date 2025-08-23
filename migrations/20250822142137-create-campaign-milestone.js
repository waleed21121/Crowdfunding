'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Campaign_milestones', {
            id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
            },
            campaign_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: { 
                model: 'Campaigns',
                key: 'id' 
              },
              onDelete: 'cascade'
            },
            title: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            target_amount: {
              type: Sequelize.DECIMAL(15, 2),
              allowNull: false,
              validate: { min: 0.01 },
            },
            achieved: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false,
            },
            created_at: {
              type: Sequelize.DATE,
              allowNull: false
            },
            updated_at: {
              type: Sequelize.DATE,
              allowNull: false
            }
          });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Campaign_milestones');
  }
};