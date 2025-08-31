import { StatusCodes } from "http-status-codes";
import { campaignMilestoneRepository, campaignRepository, pledgeRepository, RewarTierRepository, transactionLogRepository, userRepository } from "../repositories"
import { ICampaign, ICampaignQuerySchema, ITransactionLog, IUpdateCampaignSchema } from "../schemas";
import { AppError, campaignQuery, notFoundWithFilters, notFoundWithID } from "../utils";
import { RewardTier, sequelize, User } from "../models";
import { Op, Transaction } from "sequelize";

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

async function failedCampaigns() {
    const dateNow = new Date();
    const transaction = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });

    try {
        const [_, updatedCampaigns] = await campaignRepository.update(
        {
            status: 'failed',
            current_funds: 0,
        },
        {
            where: {
                [Op.and]: {
                    deadline: { [Op.lte]: dateNow },
                    status: 'active',
                },
            },
            returning: true,
        },
        transaction
    );

    for (const campaign of updatedCampaigns) {
        const pledges = await pledgeRepository.findAll({
            where: {
                campaign_id: campaign.id,
                status: 'confirmed',
            },
            include: [
                { model: User, as: 'pledge_user', attributes: ['id', 'balance'] },
                { model: RewardTier, as: 'pledge_reward', attributes: ['id', 'quantity_claimed'], required: false },
            ],
            lock: transaction.LOCK.UPDATE,
    }, transaction);

    for (const pledge of pledges) {
        
        await userRepository.update(
            {
                balance: +pledge.user!.balance + +pledge.amount,
            },
            {
                where: { id: pledge.user_id },
                returning: true
            },
            transaction
        );

        await pledgeRepository.update(
            {
                status: 'refunded',
            },
            {
                where: { id: pledge.id },
                returning: true
            },
            transaction
        );

        if (pledge.reward) {
            await RewarTierRepository.update(
                {
                    quantity_claimed: +pledge.reward.quantity_claimed - 1,
                },
                {
                    where: { id: pledge.reward.id },
                    returning: true
                },
                transaction
            );
        }

        const transactionLogPayload: ITransactionLog = {
            user_id: pledge.user_id,
            pledge_id: pledge.id,
            amount: pledge.amount,
            type: 'refund',
        };
        await transactionLogRepository.create(transactionLogPayload, transaction);
    }

        await campaignMilestoneRepository.update(
            {
                achieved: false,
            },
            {
                where: { campaign_id: campaign.id },
                returning: true
            },
            transaction
        );
    }

    await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const campaignService = {
    findAll,
    create,
    findOne,
    update,
    findAllMilestones,
    findAllRewardTiers,
    failedCampaigns
}

export default campaignService