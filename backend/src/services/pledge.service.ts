import { StatusCodes } from "http-status-codes";
import { campaignMilestoneRepository, campaignRepository, pledgeRepository, RewarTierRepository, transactionLogRepository, userRepository } from "../repositories"
import { AppError, notFoundWithID } from "../utils";
import { IPledge, ITransactionLog } from "../schemas";
import { RewardTier, sequelize } from "../models";
import { Op, Transaction } from "sequelize";

async function findOne(id: number) {
    const pledge = await pledgeRepository.finOne({where: {id: id}});
    if(!pledge) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Pledge'));
    }
    return pledge;
}

async function create(data: IPledge) {
    const transaction = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE});
    try {
        const user = await userRepository.finOne({
            where: {
                id: data.user_id
            },
            lock: Transaction.LOCK.UPDATE
        }, transaction)
        if(!user) {
            throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('User'));
        }

        const campaign = await campaignRepository.finOne({
            where: {
                id: data.campaign_id
            },
            lock: Transaction.LOCK.UPDATE
        }, transaction)
        if(!campaign) {
            throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Campaign'));
        }
        if(campaign.status == 'failed') {
            throw new AppError(StatusCodes.BAD_REQUEST, "Bad request", "The campaign is not active anymore.");
        }

        let reward_tier: RewardTier | null;
        if (data.reward_id) {
            reward_tier = await RewarTierRepository.finOne({
                where: {
                    id: data.reward_id,
                    campaign_id: data.campaign_id
                }
            }, transaction)
            if(!reward_tier) {
                throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Reward tier'));
            }
            if(reward_tier.quantity_available === 0) {
                throw new AppError(StatusCodes.BAD_REQUEST, "Bad request", `All ${reward_tier.title} rewards have been sold.`);
            }
            data.amount = reward_tier.pledge_amount;
        }

        if(user.balance < data.amount) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Bad request", "You don't have the enough balance for this pledge.")
        }
        data.status = 'confirmed';

        console.log(data, campaign, user);
        
        const updatedCampaign = await campaignRepository.update(
            {
                current_funds: (+campaign.current_funds + +data.amount),
                status: ((+campaign.current_funds + +data.amount >= +campaign.funding_goal) ? 'successful' : 'active')
            },
            {
                where: {
                    id: data.campaign_id
                },
                returning: true
            }, transaction
        )

        await userRepository.update(
            {
                balance: user.balance - data.amount
            },
            {
                where: {
                    id: data.user_id,
                },
                returning: true
            },
            transaction
        )

        if(data.reward_id) {
            await RewarTierRepository.update(
                {
                    quantity_available: reward_tier!.quantity_available - 1,
                    quantity_claimed: reward_tier!.quantity_claimed + 1
                },
                {
                    where: {
                        id: data.reward_id
                    },
                    returning: true
                },
                transaction
            )
        }

        await campaignMilestoneRepository.update(
            {
                achieved: true
            },
            {
                where: {
                    [Op.and]: {
                        campaign_id: data.campaign_id,
                        target_amount: {
                            [Op.lte]: updatedCampaign[1][0].current_funds
                        }
                    }
                },
                returning: true
            },
            transaction
        )
        const pledge = await pledgeRepository.create(data, transaction);

        const transactionLogPayload: ITransactionLog = {
            user_id: data.user_id,
            amount: data.amount,
            type: 'pledge',
            pledge_id: pledge.id
        }

        await transactionLogRepository.create(transactionLogPayload, transaction)

        await transaction.commit();

        return pledge;
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

const pledgeService = {
    findOne,
    create
}

export default pledgeService