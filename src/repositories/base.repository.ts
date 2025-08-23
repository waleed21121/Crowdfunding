import { Attributes, DestroyOptions, FindOptions, Model, ModelStatic, UpdateOptions } from "sequelize";
import { Col, Fn, Literal, MakeNullishOptional } from "sequelize/types/utils";

export default abstract class BaseRepository<M extends Model> {
    protected model: ModelStatic<M>
    constructor(model: ModelStatic<M>) {
        this.model = model;
    }

    async create(data: MakeNullishOptional<M["_creationAttributes"]>): Promise<M> {
        return await this.model.create();
    }

    async delete(options: DestroyOptions<M>): Promise<number> {
        return await this.model.destroy(options);
    }

    async finOne(options: FindOptions<M>): Promise<M | null> {
        return await this.model.findOne(options)
    }

    async findAll(options: FindOptions<M>): Promise<M[]> {
        return await this.model.findAll(options)
    }

    async update(
        data: {
            [key in keyof Attributes<M>]?: Fn | Col | Literal | Attributes<M>[key] | undefined;
        }, 
        options: Omit<UpdateOptions<Attributes<M>>, "returning"> & {
        returning: true | (keyof Attributes<M>)[];
        }): Promise<[affectedCount: number, affectedRows: M[]]> {
        return await this.model.update(data, options);
    }
}