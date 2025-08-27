import { NextFunction, Response } from "express";
import { pledgeService } from "../services";
import { IPledgeResponse } from "../dtos";
import { TIdValidator } from "../validators";
import { StatusCodes } from "http-status-codes";

const findOne: TIdValidator = async (req, res: Response<IPledgeResponse>, next: NextFunction) => {
    const pledge = await pledgeService.findOne(req.params.id)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Pledge milestone found successfully',
        data: pledge,
        error: null
    });
}

const pledgeController = {
    findOne,
}

export default pledgeController