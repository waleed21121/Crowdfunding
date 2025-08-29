import z from "zod";

export const RewardTierSchema = z.object({
    campaign_id: z
        .coerce
        .number()
        .int({ message: 'Campaign ID is required and must be an integer' })
        .gte(1, 'Campaign ID must be a positive integer'),
    title: z
        .string({ message: 'Title is required' })
        .min(1, 'Title cannot be empty')
        .max(255, 'Title must not exceed 255 characters'),
    description: z.string({ message: 'Description must be a string' }).optional(),
    pledge_amount: z
        .coerce
        .number({ message: 'Pledge amount is required' })
        .gt(0, 'Pledge amount must be positive'),
    quantity_available: z
        .coerce
        .number({ message: 'Quantity available must be a number' })
        .int('Quantity available must be an integer')
        .gte(0, 'Quantity available must be non-negative'),
    quantity_claimed: z
        .coerce
        .number({ message: 'Quantity claimed is required' })
        .int('Quantity claimed must be an integer')
        .gte(0, 'Quantity claimed must be non-negative')
        .default(0)
})

export type IRewardTier = z.infer<typeof RewardTierSchema>;