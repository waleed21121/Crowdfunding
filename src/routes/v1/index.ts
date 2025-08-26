import { Router } from "express";
import campaignRouter from "./campaign.route";
import userRouter from "./user.router";


const v1Router = Router();

v1Router.use('/campaigns', campaignRouter);
v1Router.use('/users', userRouter);


export default v1Router;