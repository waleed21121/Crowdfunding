import { validationMiddleware } from "../middlewares";
import { 
    PledgeSchema
} from "../schemas";
import { z } from 'zod';

export const createPledgeValidator = validationMiddleware(z.object({}), PledgeSchema, z.object({}))
export type TCreatePledge = typeof createPledgeValidator;
