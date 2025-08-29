import { schedule } from 'node-cron';
import { campaignService } from '../../services';

export function scheduler () {
    schedule('* */12 * * *', async () => {
        await campaignService.failedCampaigns();
    })
}