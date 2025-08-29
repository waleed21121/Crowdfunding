import { NextFunction, Request, Response } from "express";
import { userService } from "../services";
import { IUserResponse, IUserAuthResponse } from "../dtos";
import { StatusCodes } from "http-status-codes";
import { TLoginUser, TCreateUser, TVerifyUser, TDeposit } from "../validators";
import { TIdValidator } from '../validators/id.validator'

const create: TCreateUser = async (req, res: Response<IUserResponse>, next: NextFunction) => {
    const user = await userService.create(req.body);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully created a user',
        data: user,
        error: null
    })
}

const login: TLoginUser = async (req, res: Response<IUserAuthResponse>, next:NextFunction) => {
    const tokens = await userService.login(req.body);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully logined a user',
        data: tokens,
        error: null
    })
}

const verify: TVerifyUser = async (req, res: Response<IUserResponse>, next:NextFunction) => {
    const user = await userService.verify(req.query);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully verified a user',
        data: user,
        error: null
    })
}

const findAll = async (req:Request, res: Response<IUserResponse>, next: NextFunction) => {
    const users = await userService.findAll();
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Found Users',
        data: users,
        error: null
    })
}

const findOne: TIdValidator = async (req, res: Response<IUserResponse>, next) => {
    const user = await userService.findOne(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Found User',
        data: user,
        error: null
    })
}

const deleteUser: TIdValidator = async (req, res: Response<IUserResponse>, next) => {
    await userService.deleteUser(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Deleted User',
        data: null,
        error: null
    })
}

const deposit: TDeposit = async (req, res: Response<IUserResponse>, next) => {
    const user = await userService.deposit(req.body, req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully deposited your money',
        data: user,
        error: null
    })
}

const userController = {
    create,
    findAll,
    findOne,
    deleteUser,
    login,
    verify,
    deposit
}

export default userController