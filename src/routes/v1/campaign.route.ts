import { Router } from "express";
import { campaignController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { createCampaignValidator, findCampaignsValidator, idValidator, updateCampaignValidator } from "../../validators";

const campaignRouter = Router();

campaignRouter.route('/')
    .post(createCampaignValidator, wrapErrorMiddleware(campaignController.create))
    .get(findCampaignsValidator, wrapErrorMiddleware(campaignController.findAll))

campaignRouter.route('/:id')
    .get(idValidator, wrapErrorMiddleware(campaignController.findOne))
    .patch(updateCampaignValidator, wrapErrorMiddleware(campaignController.update))

export default campaignRouter;