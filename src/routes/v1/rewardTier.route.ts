import { Router } from "express";
import { rewardTierController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { createRewardTierValidator, idValidator } from "../../validators";

const rewardTierRouter = Router();

rewardTierRouter.route('/')
    .post(createRewardTierValidator, wrapErrorMiddleware(rewardTierController.create))

rewardTierRouter.route('/:id')
    .get(idValidator, wrapErrorMiddleware(rewardTierController.findOne))

export default rewardTierRouter;