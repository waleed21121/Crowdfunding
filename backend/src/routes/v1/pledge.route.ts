import { Router } from "express";
import { pledgeController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { createPledgeValidator, idValidator } from "../../validators";

const pledgeRouter = Router();

pledgeRouter.route('/')
    .post(createPledgeValidator, wrapErrorMiddleware(pledgeController.create))

pledgeRouter.route('/:id')
    .get(idValidator, wrapErrorMiddleware(pledgeController.findOne))

export default pledgeRouter;