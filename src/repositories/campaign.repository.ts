import { Campaign } from "../models";
import BaseRepository from "./base.repository";

class CampaignRepository extends BaseRepository<Campaign> {
    constructor() {
        super(Campaign)
    }
}

export default new CampaignRepository()