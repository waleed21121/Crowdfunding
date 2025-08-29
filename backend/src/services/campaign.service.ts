import { StatusCodes } from "http-status-codes";
import { campaignRepository, userRepository } from "../repositories"
import { ICampaign, ICampaignQuerySchema, IUpdateCampaignSchema } from "../schemas";
import { AppError, campaignQuery, notFoundWithFilters, notFoundWithID } from "../utils";
import { sequelize } from "../models";
import { Transaction } from "sequelize";

async function findAll(queryParameters: ICampaignQuerySchema) {
    const queryObject = campaignQuery(queryParameters);
    const campaigns = await campaignRepository.findAll(queryObject);
    if(campaigns.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithFilters('Campaigns'));
    }
    return campaigns;
}

async function findOne(id: number) {
    const campaign = await campaignRepository.finOne({where: {id: id}});
    if(!campaign) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Campaign'));
    }
    return campaign;
}

async function create(data: ICampaign) {
    const transaction = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ});
    try {
        const user = await userRepository.finOne({where: {id: data.user_id}}, transaction);
        if(!user) {
            throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('User'));
        }

        const campaign = await campaignRepository.create(data, transaction);
        await transaction.commit();

        return campaign;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function update(data: IUpdateCampaignSchema, id: number) {
    const updatedCampaign = await campaignRepository.update(
        data,
        {
            where: {id: id},
            returning: true
        }
    )

    if(updatedCampaign[0] === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Campaign'));
    }

    return updatedCampaign[1][0];
}

async function findAllMilestones(id: number) {
    const campaign = await campaignRepository.finOne({where: {id: id}});
    if(!campaign) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Campaign'));
    }

    const milestones = await campaignRepository.findAllMilestones(id);

    if(milestones.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithFilters('Milestones'));
    }

    return milestones;
}

async function findAllRewardTiers(id: number) {
    const campaign = await campaignRepository.finOne({where: {id: id}});
    if(!campaign) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Campaign'));
    }

    const rewardTiers = await campaignRepository.findAllRewardTiers(id);

    if(rewardTiers.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithFilters('Reward tiers'));
    }

    return rewardTiers;
}


const campaignService = {
    findAll,
    create,
    findOne,
    update,
    findAllMilestones,
    findAllRewardTiers
}

export default campaignService