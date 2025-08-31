import { Attributes, DestroyOptions, FindOptions, Model, ModelStatic, Transaction, UpdateOptions } from "sequelize";
import { Col, Fn, Literal, MakeNullishOptional } from "sequelize/types/utils";
import { AppError } from "../utils";
import { StatusCodes } from "http-status-codes";

export default abstract class BaseRepository<M extends Model> {
    protected model: ModelStatic<M>
    constructor(model: ModelStatic<M>) {
        this.model = model;
    }

    async create(data: MakeNullishOptional<M["_creationAttributes"]>, transaction?: Transaction): Promise<M> {
        if (transaction) {
            try {
                return await this.model.create(data, {transaction: transaction});
            } catch (error) {
                throw new AppError(StatusCodes.BAD_REQUEST, "Transaction error", error)
            }
        } else { 
            return await this.model.create(data);
        }
    }

    async delete(options: DestroyOptions<M>): Promise<number> {
        return await this.model.destroy(options);
    }

    async finOne(options: FindOptions<M>, transaction?: Transaction): Promise<M | null> {
        if (transaction) {
            try {
                options.transaction = transaction
                return await this.model.findOne(options)
            } catch (error) {
                throw new AppError(StatusCodes.BAD_REQUEST, "Transaction error", error)
            }
        } else {
                    return await this.model.findOne(options)
        }
    }

    async findAll(options: FindOptions<M>, transaction?: Transaction): Promise<M[]> {
        if (transaction) {
            try {
                options.transaction = transaction
                return await this.model.findAll(options)
            } catch (error) {
                throw new AppError(StatusCodes.BAD_REQUEST, "Transaction error", error)
            }
        } else {
            return await this.model.findAll(options)
        }
    }

    async update(
        data: {
            [key in keyof Attributes<M>]?: Fn | Col | Literal | Attributes<M>[key] | undefined;
        }, 
        options: Omit<UpdateOptions<Attributes<M>>, "returning"> & {
        returning: true | (keyof Attributes<M>)[];
        },
        transaction?: Transaction): Promise<[affectedCount: number, affectedRows: M[]]> {
        if(transaction) {
            try {
                options.transaction = transaction
                return await this.model.update(data, options);
            } catch (error) {
                throw new AppError(StatusCodes.BAD_REQUEST, "Transaction error", error)
            }
        } else {
            return await this.model.update(data, options);
        }
    }
}