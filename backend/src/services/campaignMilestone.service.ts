import { StatusCodes } from "http-status-codes";
import { campaignMilestoneRepository, campaignRepository } from "../repositories"
import { ICampaignMilestone } from "../schemas";
import { AppError, notFoundWithID } from "../utils";

async function findOne(id: number) {
    const campaignMilestone = await campaignMilestoneRepository.finOne({where: {id: id}});
    if(!campaignMilestone) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Campaign milestone'));
    }
    return campaignMilestone;
}

async function create(data: ICampaignMilestone) {
    const campaign = await campaignRepository.finOne({where: {id: data.campaign_id}});
    if(!campaign) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Campaign'));
    }

    const campaignMilestone = await campaignMilestoneRepository.create(data);
    return campaignMilestone;
}



const campaignMilestoneService = {
    create,
    findOne,
}

export default campaignMilestoneService