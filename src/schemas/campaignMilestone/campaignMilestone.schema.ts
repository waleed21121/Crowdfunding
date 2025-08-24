import z from "zod";

export const CampaignMilestoneSchema = z.object({
    campaign_id: z
        .int({ message: 'Campaign ID is required and must be an integer' })
        .gte(1, 'The campaign ID must be positive integer'),
    title: z
        .string({ message: 'Title is required' })
        .min(1, 'Title cannot be empty')
        .max(255, 'Title must not exceed 255 characters'),
    target_amount: z
        .number({ message: 'Target amount is required' })
        .gt(0, 'Target amount must be positive'),
    achieved: z
        .boolean({ message: 'Achieved status is required' })
        .default(false),
})

export type ICampaignMilestone = z.infer<typeof CampaignMilestoneSchema>;