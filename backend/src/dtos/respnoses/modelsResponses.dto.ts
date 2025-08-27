import { Campaign, CampaignMilestone, Pledge, RewardTier, TransactionLog, User } from "../../models";
import BaseResponse from "./baseResponse.dto";

export interface IUserResponse extends BaseResponse<User> {}
export interface ICampaignResponse extends BaseResponse<Campaign> {}
export interface ICampaignMilestoneResponse extends BaseResponse<CampaignMilestone> {}
export interface IRewardTierResponse extends BaseResponse<RewardTier> {}
export interface IPledgeResponse extends BaseResponse<Pledge> {}
export interface ITransactionLogResponse extends BaseResponse<TransactionLog> {}

export interface IUserAuthResponse {
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    };
    error: Error | null;
}