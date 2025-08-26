import { Router } from "express";
import campaignRouter from "./campaign.route";



const v1Router = Router();

v1Router.use('/campaigns', campaignRouter);



export default v1Router;