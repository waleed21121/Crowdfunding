import { StatusCodes } from "http-status-codes";
import { campaignRepository, userRepository } from "../repositories"
import { ICampaign, ICampaignQuerySchema, IUpdateCampaignSchema } from "../schemas";
import { AppError, campaignQuery, notFoundWithFilters, notFoundWithID } from "../utils";

async function findAll(queryParameters: ICampaignQuerySchema) {
    const queryObject = campaignQuery(queryParameters);
    const campaigns = await campaignRepository.findAll(queryObject);
    if(!campaigns) {
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
    const user = await userRepository.finOne({where: {id: data.user_id}});
    if(!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('User'));
    }

    const campaign = await campaignRepository.create(data);
    return campaign;
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

const campaignService = {
    findAll,
    create,
    findOne,
    update
}

export default campaignService