import { Router } from "express";
import { userController} from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators/id.validator";
import { loginUserValidator, createUserValidator, verifyUserValidator } from "../../validators";

const userRouter = Router();

userRouter.route('/')
                .get(wrapErrorMiddleware(userController.findAll))

userRouter.route('/login')
                .post(loginUserValidator, wrapErrorMiddleware(userController.login));

userRouter.route('/register')
                .post(createUserValidator, wrapErrorMiddleware(userController.create));

userRouter.route('/verify-email')
                .get(verifyUserValidator, wrapErrorMiddleware(userController.verify));

userRouter.route('/:id')
                .get(idValidator, wrapErrorMiddleware(userController.findOne))
                .delete(idValidator, wrapErrorMiddleware(userController.deleteUser));

export default userRouter;