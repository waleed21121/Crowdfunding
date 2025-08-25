import z from "zod";

export const CampaignSchema = z.object({
    user_id: z
        .int({ message: 'User ID is required' })
        .gte(1, 'The Id must be positive integer'),
    title: z
        .string({ message: 'Title is required' })
        .min(1, 'Title cannot be empty')
        .max(255, 'Title must not exceed 255 characters'),
    description: z.string({ message: 'Description must be a string' }).optional(),
    funding_goal: z
        .number({ message: 'Funding goal is required' })
        .gt(0, 'Funding goal must be positive'),
    current_funds: z
        .number({ message: 'Current funds is required' })
        .gte(0, 'Current funds must be non-negative')
        .default(0.00),
    deadline: z
        .date({ message: 'Deadline is required' })
        .refine((date) => date > new Date(), 'Deadline must be in the future'),
    status: z
        .enum(['active', 'successful', 'failed'], 'Status must be one of: active, successful, failed' )
        .default('active'),
})

export type ICampaign = z.infer<typeof CampaignSchema>;