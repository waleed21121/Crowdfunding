import { Dialect, Sequelize } from 'sequelize';
import { envVariables } from '../config';
import { User } from './user';
import { Campaign } from './campaign';
import { RewardTier } from './reward_tier';
import { CampaignMilestone } from './campaign_milestone';
import { TransactionLog } from './transaction_log';
import { Pledge } from './pledge';


const sequelize = new Sequelize({
  dialect: envVariables.DIALECT as Dialect, 
  host: envVariables.DB_HOST,
  port: envVariables.DB_PORT,
  database: envVariables.DB_NAME,
  username: envVariables.DB_USER,
  password: envVariables.DB_PASSWORD,
  logging: envVariables.NODE_ENV === 'development' ? console.log : false,
});



// Initialize models
User.initModel(sequelize);
Campaign.initModel(sequelize);
RewardTier.initModel(sequelize);
CampaignMilestone.initModel(sequelize);
TransactionLog.initModel(sequelize);
Pledge.initModel(sequelize);


// Run Associations
require('./associations');

const DBConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export {
    sequelize,
    DBConnect,
    User,
    Campaign,
    RewardTier,
    CampaignMilestone,
    TransactionLog,
    Pledge
};