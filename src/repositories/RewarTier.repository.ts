import { RewardTier } from "../models";
import BaseRepository from "./base.repository";

class RewardTierRepository extends BaseRepository<RewardTier> {
    constructor() {
        super(RewardTier)
    }
}

export default new RewardTierRepository()