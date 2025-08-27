import { NextFunction, Response } from "express";
import { campaignService } from "../services";
import { ICampaignResponse } from "../dtos";
import { TCreateCampaign, TFindCampaigns, TIdValidator, TUpdateCampaign } from "../validators";
import { StatusCodes } from "http-status-codes";


const create: TCreateCampaign = async (req, res: Response<ICampaignResponse>, next: NextFunction) => {
    const campaign = await campaignService.create(req.body);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Campaign created successfully',
        data: campaign,
        error: null
    });
}

const findAll: TFindCampaigns = async (req, res: Response<ICampaignResponse>, next: NextFunction) => {
    const campaign = await campaignService.findAll(req.query)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Campaigns found successfully',
        data: campaign,
        error: null
    });
}

const findOne: TIdValidator = async (req, res: Response<ICampaignResponse>, next: NextFunction) => {
    const campaigns = await campaignService.findOne(req.params.id)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Campaign found successfully',
        data: campaigns,
        error: null
    });
}

const update: TUpdateCampaign = async (req, res: Response<ICampaignResponse>, next: NextFunction) => {
    const campaign = await campaignService.update(req.body, req.params.id)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Campaign updated successfully',
        data: campaign,
        error: null
    });
}


const campaignController = {
    create,
    findAll,
    findOne,
    update
}

export default campaignController