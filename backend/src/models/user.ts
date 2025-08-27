import { DataTypes, Model, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyToken: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Model<UserAttributes, Partial<UserAttributes>> implements UserAttributes {
  
  id: number;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyToken: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;

  static initModel(sequelize: Sequelize): typeof User {
    return User.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      verifyToken: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      modelName: 'User'
    })
  }
}