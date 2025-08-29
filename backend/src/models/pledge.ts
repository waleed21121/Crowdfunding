import { DataTypes, Model, Sequelize } from 'sequelize';

interface PledgeAttributes {
  id: number;
  user_id: number;
  campaign_id: number;
  amount: number;
  reward_id: number;
  status: 'pending' | 'confirmed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

export class Pledge extends Model<PledgeAttributes, Partial<PledgeAttributes>> implements PledgeAttributes {
  id: number;
  user_id: number;
  campaign_id: number;
  amount: number;
  reward_id: number;
  status: 'pending' | 'confirmed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;

  static initModel(sequelize: Sequelize): typeof Pledge {
    return Pledge.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { 
            model: 'Users', 
            key: 'id' 
          },
          onDelete: 'cascade'
        },
        campaign_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { 
            model: 'Campaigns', 
            key: 'id' 
          },
          onDelete: 'cascade'
        },
        amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
          validate: { min: 0.01 },
        },
        reward_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: { 
            model: 'Reward_tiers', 
            key: 'id' 
          },
          onDelete: 'cascade'
        },
        status: {
          type: DataTypes.ENUM('pending', 'confirmed', 'refunded'),
          allowNull: false,
          defaultValue: 'pending',
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        }
      },
      {
        sequelize,
        modelName: 'Pledge',
      }
    );
  }
}