import { Pledge } from "../models";
import BaseRepository from "./base.repository";

class PledgeRepository extends BaseRepository<Pledge> {
    constructor() {
        super(Pledge)
    }
}

export default new PledgeRepository()