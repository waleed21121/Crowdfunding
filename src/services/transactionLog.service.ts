import { StatusCodes } from "http-status-codes";
import { transactionLogRepository } from "../repositories"
import { AppError, notFoundWithID } from "../utils";

async function findOne(id: number) {
    const transactionLog = await transactionLogRepository.finOne({where: {id: id}});
    if(!transactionLog) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Pledge'));
    }
    return transactionLog;
}

const transactionLogService = {
    findOne,
}

export default transactionLogService