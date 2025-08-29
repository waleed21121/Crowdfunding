import { StatusCodes } from "http-status-codes";
import { campaignRepository, pledgeRepository, transactionLogRepository, userRepository } from "../repositories"
import { ICampaign, ICampaignQuerySchema, ITransactionLog, IUpdateCampaignSchema } from "../schemas";
import { AppError, campaignQuery, notFoundWithFilters, notFoundWithID } from "../utils";
import { sequelize } from "../models";
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
    const transaction = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE})
    try {
        const campaigns = await campaignRepository.update(
            {
                status: 'failed',
            },
            {
                where: {
                    [Op.and]: {
                        deadline: {
                            [Op.lte]: dateNow
                        },
                        status: 'active'
                    }
                },
                returning: true
            },
            transaction
        )
        campaigns[1].forEach(async (campaign) => {
            const pledges = await pledgeRepository.findAll({
                where: {
                    campaign_id: campaign.id,
                    status: 'confirmed'
                },
                attributes: [
                    'user_id',
                    'amount'
                ]
            }, transaction)

            pledges.forEach(async (pledge) => {
                const user = await userRepository.finOne({where: {id: pledge.user_id}})
                if(user) {
                    await userRepository.update(
                        {
                            balance: +user.balance + pledge.amount
                        },
                        {
                            where: {
                                id: pledge.user_id
                            },
                            returning: true
                        },
                        transaction
                    )

                    const transactionLogPayload: ITransactionLog = {
                        user_id: user.id,
                        amount: pledge.amount,
                        type: 'refund'
                    }
                    await transactionLogRepository.create(transactionLogPayload, transaction);
                }
            })
        })

        await transaction.commit();
        
    } catch (error) {
        transaction.rollback();
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