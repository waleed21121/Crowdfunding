import { Router } from "express";
import { pledgeController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators";

const pledgeRouter = Router();

pledgeRouter.route('/:id')
    .get(idValidator, wrapErrorMiddleware(pledgeController.findOne))

export default pledgeRouter;