import { NextFunction, Request, Response } from "express";
import { AppError } from '../utils';
import { IErrorRsponse } from '../dtos';
import { logger } from "../config";

export default function errorHandler (err: AppError, req: Request, res: Response<IErrorRsponse>, next: NextFunction) {
    logger.error(`${err.statusCode} ${err.message}`)
    res.status(err.statusCode).send({
        success: false,
        message: err.message,
        data: null,
        error: err.errors
    })
}