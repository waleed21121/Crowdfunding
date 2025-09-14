import React from 'react'
import CampaignInfo from '../components/campainAllInfo/CampaignInfo'
import {useParams} from 'react-router'
import AddMilestone from '../components/addMilestone/AddMilestone';
import AddRewardTeir from '../components/addRewardTeir/AddRewardTeir';
import ShowMilestones from '../components/showMilestones/ShowMilestones';
import ShowRewardTeir from '../components/showRewardTeir/ShowRewardTeir';

const Campaign = () => {
    
    let {id}=useParams();

    return (
        <div>
            <div className="container">
                <CampaignInfo campaignId={id}/>
                <ShowMilestones campaignId={id}/>
                <AddMilestone campaignId={id}/>
                <ShowRewardTeir campaignId={id}/>
                <AddRewardTeir campaignId={id}/>
            </div>
        </div>
    )
}

export default Campaign
