import { NextFunction, Request, Response } from "express";
import { logger } from "../config";

export default function (req: Request, res: Response, next: NextFunction) {
    logger.http(`${req.method} ${req.url}`)
    next();
}