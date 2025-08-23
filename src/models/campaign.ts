import { DataTypes, Model, Sequelize } from 'sequelize';

interface CampaignAttributes {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  funding_goal: number;
  current_funds: number;
  deadline: Date;
  status: 'active' | 'successful' | 'failed';
  created_at: Date;
  updated_at: Date;
}

export class Campaign extends Model<CampaignAttributes, Partial<CampaignAttributes>> implements CampaignAttributes {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  funding_goal: number;
  current_funds: number;
  deadline: Date;
  status: 'active' | 'successful' | 'failed';
  created_at: Date;
  updated_at: Date;

  static initModel(sequelize: Sequelize): typeof Campaign {
    return Campaign.init({
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
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        funding_goal: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
          validate: { min: 0.01 },
        },
        current_funds: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
          defaultValue: 0.00,
          validate: { min: 0 },
        },
        deadline: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('active', 'successful', 'failed'),
          allowNull: false,
          defaultValue: 'active',
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Campaign',
      }
    );
  }
}