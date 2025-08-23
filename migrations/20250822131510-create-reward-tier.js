'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reward_tiers', {
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
            model: 'Campaigns', key: 'id' 
          },
          onDelete: 'cascade'
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        pledge_amount: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: false,
          validate: { min: 0.01 },
        },
        quantity_available: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: { min: 0 },
        },
        quantity_claimed: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
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
    await queryInterface.dropTable('Reward_tiers');
  }
};