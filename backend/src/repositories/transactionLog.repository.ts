import { TransactionLog } from "../models";
import BaseRepository from "./base.repository";

class TransactionLogRepository extends BaseRepository<TransactionLog> {
    constructor() {
        super(TransactionLog)
    }
}

export default new TransactionLogRepository()