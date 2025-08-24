import z from "zod";

export const PledgeSchema = z.object({
    user_id: z
        .int({ message: 'User ID must be an integer' })
        .gte(1, "User ID must be positive integer"),
    campaign_id: z
        .int({ message: 'Reward ID must be an integer' })
        .gte(1, "Reward ID must be positive integer"),
    amount: z
        .number({ message: 'Amount is required' })
        .gt(0, 'Amount must be positive'),
    reward_id: z
        .int({ message: 'Reward ID must be an integer' })
        .gte(1, "Reward ID must be positive integer")
        .nullable()
        .optional(),
    status: z
        .enum(['pending', 'confirmed', 'refunded'], 'Status must be one of: pending, confirmed, refunded' )
        .default('pending')
        .optional(),
})

export type IPledge = z.infer<typeof PledgeSchema>;