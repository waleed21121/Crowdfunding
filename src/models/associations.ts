import { Campaign, CampaignMilestone, Pledge, RewardTier, TransactionLog, User } from '.'

User.hasMany(Campaign, {
    foreignKey: 'user_id'
})

Campaign.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'campaigns',
    onDelete: 'cascade'
})

User.hasMany(TransactionLog, {
    foreignKey: 'user_id'
})

TransactionLog.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'transactions',
    onDelete: 'cascade'
})

User.hasMany(Pledge, {
    foreignKey: 'user_id'
})

Pledge.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'user_pledges',
    onDelete: 'cascade'
})

Campaign.hasMany(RewardTier, {
    foreignKey: 'campaign_id'
})

RewardTier.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
    targetKey: 'id',
    as: 'reward_tiers',
    onDelete: 'cascade'
})

Campaign.hasMany(CampaignMilestone, {
    foreignKey: 'campaign_id'
})

CampaignMilestone.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
    targetKey: 'id',
    as: 'campaign_milestones',
    onDelete: 'cascade'
})

Campaign.hasMany(Pledge, {
    foreignKey: 'campaign_id'
})

Pledge.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
    targetKey: 'id',
    as: 'campaign_pledges',
    onDelete: 'cascade'
})

Pledge.hasOne(TransactionLog, {
    foreignKey: 'pledge_id'
})

TransactionLog.belongsTo(Pledge, {
    foreignKey: 'pledge_id',
    targetKey: 'id',
    as: 'transaction',
    onDelete: 'cascade'
})