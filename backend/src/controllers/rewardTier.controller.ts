import { NextFunction, Response } from "express";
import { rewardTierService } from "../services";
import { IRewardTierResponse } from "../dtos";
import { TCreateRewardTier, TIdValidator } from "../validators";
import { StatusCodes } from "http-status-codes";


const create: TCreateRewardTier = async (req, res: Response<IRewardTierResponse>, next: NextFunction) => {
    const rewardTier = await rewardTierService.create(req.body);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'reward tier created successfully',
        data: rewardTier,
        error: null
    });
}

const findOne: TIdValidator = async (req, res: Response<IRewardTierResponse>, next: NextFunction) => {
    const rewardTier = await rewardTierService.findOne(req.params.id)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'reward tier found successfully',
        data: rewardTier,
        error: null
    });
}

const rewardTierController = {
    create,
    findOne,
}

export default rewardTierController