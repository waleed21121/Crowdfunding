import { FindOptions } from "sequelize";
import { ICampaignQuerySchema } from "../../schemas";
import { Campaign, User } from "../../models";

export default function (data: ICampaignQuerySchema) {
    let queryObject: FindOptions<Campaign> = {}

    queryObject.include = [
        {
            model: User,
            as: 'campaign_user',
            required: true,
            attributes: ['email', 'name']
        }
    ]

    // perform filtering
    if(data.campaignDate) {
        queryObject.where = {}
        queryObject.where.deadline = data.campaignDate;
    }

    // perform pagination
    const limit = data.limit;
    const offset = (data.page - 1) * limit;
    queryObject.limit = limit;
    queryObject.offset = offset;

    // perform sort
    if(data.sort) {
        queryObject.order = []
        let atts_order = data.sort.split(',');
        let sort: [string, string][] = []; 
        atts_order.forEach((att_order) => {
            const [att, order] = att_order.split('_');
            if(att in Object.keys(Campaign) && (order === 'ASC' || order === 'DESC')) {
                sort.push([att, order])
            }
        })
        queryObject.order = sort;
    }

    return queryObject;
}