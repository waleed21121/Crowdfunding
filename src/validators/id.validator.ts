import { validationMiddleware } from "../middlewares";
import { IDSchema } from "../schemas";
import { z } from 'zod';

export const idValidator = validationMiddleware(IDSchema, z.object({}), z.object({}));
export type TIdValidator = typeof idValidator;