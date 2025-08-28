import { Campaign } from "../models";
import BaseRepository from "./base.repository";
import campaignMilestoneRepository from "./campaignMilestone.repository";
import RewarTierRepository from "./RewarTier.repository";

class CampaignRepository extends BaseRepository<Campaign> {
    constructor() {
        super(Campaign)
    }

    async findAllMilestones(id: number) {
        const milestones = await campaignMilestoneRepository.findAll({where: {campaign_id: id}});
        return milestones
    }

    async findAllRewardTiers(id: number) {
        const rewardTiers = await RewarTierRepository.findAll({where: {campaign_id: id}});
        return rewardTiers;
    }
}

export default new CampaignRepository()