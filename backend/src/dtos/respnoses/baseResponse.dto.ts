import { Model } from "sequelize";

export default interface BaseResponse<M extends Model> {
    success: boolean;
    message: string;
    data: M | M[] | null;
    error: Error | null;
}