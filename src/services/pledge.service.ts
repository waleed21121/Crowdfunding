import { StatusCodes } from "http-status-codes";
import { pledgeRepository } from "../repositories"
import { AppError, notFoundWithID } from "../utils";

async function findOne(id: number) {
    const pledge = await pledgeRepository.finOne({where: {id: id}});
    if(!pledge) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not found", notFoundWithID('Pledge'));
    }
    return pledge;
}

const pledgeService = {
    findOne,
}

export default pledgeService