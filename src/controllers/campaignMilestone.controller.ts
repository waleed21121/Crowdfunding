import { NextFunction, Response } from "express";
import { campaignMilestoneService } from "../services";
import { ICampaignMilestoneResponse } from "../dtos";
import { TCreateCampaignMilestone, TIdValidator } from "../validators";
import { StatusCodes } from "http-status-codes";


const create: TCreateCampaignMilestone = async (req, res: Response<ICampaignMilestoneResponse>, next: NextFunction) => {
    const campaignMilestone = await campaignMilestoneService.create(req.body);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Campaign milestone created successfully',
        data: campaignMilestone,
        error: null
    });
}

const findOne: TIdValidator = async (req, res: Response<ICampaignMilestoneResponse>, next: NextFunction) => {
    const campaignMilestone = await campaignMilestoneService.findOne(req.params.id)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Campaign milestone found successfully',
        data: campaignMilestone,
        error: null
    });
}

const campaignMilestoneController = {
    create,
    findOne,
}

export default campaignMilestoneController