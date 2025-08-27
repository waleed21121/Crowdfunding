import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { UserSchema } from "../schemas/user/user.schema";
import { LoginUserSchema } from "../schemas";
import { VerifyUserSchema } from "../schemas";


export const createUserValidator = validationMiddleware(z.object({}), UserSchema, z.object({}))
export type TCreateUser = typeof createUserValidator

export const loginUserValidator = validationMiddleware(z.object({}), LoginUserSchema, z.object({}));
export type TLoginUser = typeof loginUserValidator

export const verifyUserValidator = validationMiddleware(z.object({}), z.object({}), VerifyUserSchema);
export type TVerifyUser = typeof verifyUserValidator