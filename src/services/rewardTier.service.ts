import { StatusCodes } from "http-status-codes";
import { RewarTierRepository, campaignRepository } from "../repositories"
import { IRewardTier } from "../schemas";
import { AppError, notFoundWithID } from "../utils";

async function findOne(id: number) {
    const rewardTier = await RewarTierRepository.finOne({where: {id: id}});
    if(!rewardTier) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Reward tier'));
    }
    return rewardTier;
}

async function create(data: IRewardTier) {
    const campaign = await campaignRepository.finOne({where: {id: data.campaign_id}});
    if(!campaign) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Campaign'));
    }

    const campaignMilestone = await RewarTierRepository.create(data);
    return campaignMilestone;
}



const rewardTierService = {
    create,
    findOne,
}

export default rewardTierService