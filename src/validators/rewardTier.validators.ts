import { validationMiddleware } from "../middlewares";
import { 
    RewardTierSchema, 
} from "../schemas";
import { z } from 'zod';

export const createRewardTierValidator = validationMiddleware(z.object({}), RewardTierSchema, z.object({}))
export type TCreateRewardTier = typeof createRewardTierValidator;
