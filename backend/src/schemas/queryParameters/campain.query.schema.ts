import { z } from "zod";

export const CampaignQuerySchema = z.object({
    limit: z
        .coerce
        .number()
        .int()
        .min(10, 'The limit must be at least 10 and at most 50')
        .max(50, 'The limit must be at least 10 and at most 50')
        .default(25),
    page: z
        .coerce
        .number()
        .int('The Page must be positive integer')
        .min(1, 'The Page must be positive integer')
        .default(1),
    campaignDate: z.string('The date must be in ISO format: YYYY-MM-DDThh:mm:ssZ').optional(),
    sort: z.string().optional()
})

export type ICampaignQuerySchema = z.infer<typeof CampaignQuerySchema>