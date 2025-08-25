import { validationMiddleware } from "../middlewares";
import { 
    CampaignSchema, 
    UpdateCampaignSchema, 
    CampaignQuerySchema, 
    IDSchema
} from "../schemas";
import { z } from 'zod';

export const createCampaignValidator = validationMiddleware(z.object({}), CampaignSchema, z.object({}))
export type TCreateCampaign = typeof createCampaignValidator;

export const findCampaignsValidator = validationMiddleware(z.object({}), z.object({}), CampaignQuerySchema)
export type TFindCampaigns = typeof findCampaignsValidator;

export const updateCampaignValidator = validationMiddleware(IDSchema, UpdateCampaignSchema, z.object({}))
export type TUpdateCampaign = typeof updateCampaignValidator;