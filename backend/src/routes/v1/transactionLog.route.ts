import { Router } from "express";
import { transactionLogController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators";

const transactionLogRouter = Router();

transactionLogRouter.route('/:id')
    .get(idValidator, wrapErrorMiddleware(transactionLogController.findOne))

export default transactionLogRouter;