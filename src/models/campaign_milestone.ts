import { DataTypes, Model, Sequelize } from 'sequelize';

interface CampaignMilestoneAttributes {
  id: number;
  campaign_id: number;
  title: string;
  target_amount: number;
  achieved: boolean;
  created_at: Date;
  updated_at: Date;
}

export class CampaignMilestone extends Model<CampaignMilestoneAttributes, Partial<CampaignMilestoneAttributes>> implements CampaignMilestoneAttributes {
  id: number;
  campaign_id: number;
  title: string;
  target_amount: number;
  achieved: boolean;
  created_at: Date;
  updated_at: Date;

  static initModel(sequelize: Sequelize): typeof CampaignMilestone {
    return CampaignMilestone.init(
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
            model: 'Campaigns',
            key: 'id' 
          },
          onDelete: 'cascade'
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        target_amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
          validate: { min: 0.01 },
        },
        achieved: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'CampaignMilestone',
      }
    );
  }
}