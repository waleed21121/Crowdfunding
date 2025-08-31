import { DataTypes, Model, Sequelize } from 'sequelize';

interface RewardTierAttributes {
  id: number;
  campaign_id: number;
  title: string;
  description: string;
  pledge_amount: number;
  quantity_available: number;
  quantity_claimed: number;
  createdAt: Date;
  updatedAt: Date;
}

export class RewardTier extends Model<RewardTierAttributes, Partial<RewardTierAttributes>> implements RewardTierAttributes {
  id: number;
  campaign_id: number;
  title: string;
  description: string;
  pledge_amount: number;
  quantity_available: number;
  quantity_claimed: number;
  createdAt: Date;
  updatedAt: Date;

  static initModel(sequelize: Sequelize): typeof RewardTier {
    return RewardTier.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        campaign_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { 
            model: 'Campaigns', key: 'id' 
          },
          onDelete: 'cascade'
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        pledge_amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
          validate: { min: 0.01 },
        },
        quantity_available: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: { min: 0 },
        },
        quantity_claimed: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Reward_tier',
      }
    );
  }
}