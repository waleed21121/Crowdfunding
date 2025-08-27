import { z } from 'zod';
import { CampaignSchema } from '..';

export const UpdateCampaignSchema = CampaignSchema.pick({
    title: true,
    description: true,
    deadline: true
})

export type IUpdateCampaignSchema = z.infer<typeof UpdateCampaignSchema>

