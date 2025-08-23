'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pledges', {
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
            campaign_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: { 
                model: 'Campaigns', 
                key: 'id' 
              },
              onDelete: 'cascade'
            },
            amount: {
              type: Sequelize.DECIMAL(15, 2),
              allowNull: false,
              validate: { min: 0.01 },
            },
            reward_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: { 
                model: 'Reward_tiers', 
                key: 'id' 
              },
              onDelete: 'cascade'
            },
            status: {
              type: Sequelize.ENUM('pending', 'confirmed', 'refunded'),
              allowNull: false,
              defaultValue: 'pending',
            },
            created_at: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            updated_at: {
              type: Sequelize.DATE,
              allowNull: false,
            }
          });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pledges');
  }
};