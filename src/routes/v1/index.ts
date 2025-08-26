import { Router } from "express";
import campaignRouter from "./campaign.route";
import userRouter from "./user.router";
import campaignMilestoneRouter from "./campaignMilestone.route";
import rewardTierRouter from "./rewardTier.route";

const v1Router = Router();

v1Router.use('/campaigns', campaignRouter);
v1Router.use('/users', userRouter);
v1Router.use('/milestones', campaignMilestoneRouter);
v1Router.use('/reward_tiers', rewardTierRouter);

export default v1Router;