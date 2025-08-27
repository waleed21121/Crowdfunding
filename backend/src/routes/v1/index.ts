import { Router } from "express";
import campaignRouter from "./campaign.route";
import userRouter from "./user.router";
import campaignMilestoneRouter from "./campaignMilestone.route";
import rewardTierRouter from "./rewardTier.route";
import pledgeRouter from "./pledge.route";
import transactionLogRouter from "./transactionLog.route";

const v1Router = Router();

v1Router.use('/campaigns', campaignRouter);
v1Router.use('/users', userRouter);
v1Router.use('/milestones', campaignMilestoneRouter);
v1Router.use('/reward_tiers', rewardTierRouter);
v1Router.use('/pledges', pledgeRouter);
v1Router.use('/transaction_logs', transactionLogRouter);

export default v1Router;