import { CampaignMilestone } from "../models";
import BaseRepository from "./base.repository";

class CampaignMilestoneRepository extends BaseRepository<CampaignMilestone> {
    constructor() {
        super(CampaignMilestone)
    }
}

export default new CampaignMilestoneRepository()