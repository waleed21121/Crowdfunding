import { DataTypes, Model, Sequelize } from 'sequelize';

interface TransactionLogAttributes {
  id: number;
  user_id: number;
  pledge_id: number | null;
  amount: number;
  type: 'pledge' | 'refund' | 'deposit';
  created_at: Date;
  updated_at: Date;
}

export class TransactionLog extends Model<TransactionLogAttributes, Partial<TransactionLogAttributes>> implements TransactionLogAttributes {
  id: number;
  user_id: number;
  pledge_id: number | null;
  amount: number;
  type: 'pledge' | 'refund' | 'deposit';
  created_at: Date;
  updated_at: Date;

  static initModel(sequelize: Sequelize): typeof TransactionLog {
    return TransactionLog.init(
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
        pledge_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: { 
            model: 'Pledges',
            key: 'id' 
          },
          onDelete: 'SET NULL'
        },
        amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM('pledge', 'refund', 'deposit'),
          allowNull: false,
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
        modelName: 'TransactionLog',
      }
    );
  }
}