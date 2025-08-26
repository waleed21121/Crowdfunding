import { Router } from "express";
import campaignRouter from "./campaign.route";
import userRouter from "./user.router";
import campaignMilestoneRouter from "./campaignMilestone.route";


const v1Router = Router();

v1Router.use('/campaigns', campaignRouter);
v1Router.use('/users', userRouter);
v1Router.use('/milestones', campaignMilestoneRouter);

export default v1Router;