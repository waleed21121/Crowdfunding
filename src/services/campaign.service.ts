import { campaignRepository } from "../repositories"
import { ICampaignQuerySchema } from "../schemas";
import { campaignQuery } from "../utils";

async function findAll(queryParameters: ICampaignQuerySchema) {
    const queryObject = campaignQuery(queryParameters);
    const campaigns = await campaignRepository.findAll(queryObject);
    return campaigns;
}

const campaignService = {
    findAll
}

export default campaignService