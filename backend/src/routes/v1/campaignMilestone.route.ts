import { Router } from "express";
import { campaignMilestoneController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { createCampaignMilestoneValidator, idValidator } from "../../validators";

const campaignMilestoneRouter = Router();

campaignMilestoneRouter.route('/')
    .post(createCampaignMilestoneValidator, wrapErrorMiddleware(campaignMilestoneController.create))

campaignMilestoneRouter.route('/:id')
    .get(idValidator, wrapErrorMiddleware(campaignMilestoneController.findOne))

export default campaignMilestoneRouter;