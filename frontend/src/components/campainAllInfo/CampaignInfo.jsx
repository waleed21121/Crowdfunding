import React, { useEffect, useState } from 'react'
import './campaignInfo.css'
import { campaignsData } from '../../assets/assets';

const CampaignInfo = ({campaignId}) => {
    let [campaign,setCampaign]=useState({});

    useEffect(()=> {
        // request to get the campaign
        setCampaign(campaignsData[campaignId-1]);
    },[])
    return (
        <div className='info'>
            <div className="main">
                <h1 className="name">{campaign.title}</h1>
                <p className={`status ${campaign.status}`}>{campaign.status}</p>
            </div>

            <p className="description">{campaign.description}</p>
            <p className="funding_goal commonP">funding goal : <span>{campaign.funding_goal} $</span></p>
            <p className="current_funds commonP">current funds : <span>{campaign.current_funds} $</span></p>
            <p className="deadline commonP">current funds : <span>{campaign.deadline}</span></p>
            
        </div>
    )
}

export default CampaignInfo
