import { NextFunction, Response } from "express";
import { transactionLogService } from "../services";
import { ITransactionLogResponse } from "../dtos";
import { TIdValidator } from "../validators";
import { StatusCodes } from "http-status-codes";

const findOne: TIdValidator = async (req, res: Response<ITransactionLogResponse>, next: NextFunction) => {
    const transactionLog = await transactionLogService.findOne(req.params.id)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Transaction found successfully',
        data: transactionLog,
        error: null
    });
}

const transactionLogController = {
    findOne,
}

export default transactionLogController