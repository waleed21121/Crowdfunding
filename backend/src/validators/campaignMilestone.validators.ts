import { validationMiddleware } from "../middlewares";
import { 
    CampaignMilestoneSchema, 
    IDSchema
} from "../schemas";
import { z } from 'zod';

export const createCampaignMilestoneValidator = validationMiddleware(z.object({}), CampaignMilestoneSchema, z.object({}))
export type TCreateCampaignMilestone = typeof createCampaignMilestoneValidator;
