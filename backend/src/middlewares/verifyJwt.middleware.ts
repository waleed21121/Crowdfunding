import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils";
import { JWT } from "../utils";
import { User } from "../models";
import { StatusCodes } from "http-status-codes";

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

export default async function (req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['accessToken'] || req.cookies['accessToken'];
    const refreshToken = req.headers['refreshToken'] || req.cookies['refreshToken'];
    console.log(accessToken);
    console.log(refreshToken);
    
    
    try {
        const payload: any = await JWT.verifyToken(accessToken);
        res.header('accessToken', accessToken);
        req.user = payload;
        next();
    } catch (accessTokenError) {
        try {
            const payload: any = await JWT.verifyToken(refreshToken);
            const newAccessToken = await JWT.accessTokenGenerator(payload);
            res.header('accessToken', newAccessToken);
            res.cookie('accessToken', newAccessToken, {httpOnly: true, secure: true});
            req.user = payload;
            next();
            
        } catch (refreshTokenError) {
            next(refreshTokenError);
        }
    }
}