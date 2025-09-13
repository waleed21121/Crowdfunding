import React from 'react'
import CampaignInfo from '../components/campainAllInfo/CampaignInfo'
import {useParams} from 'react-router'

const Campaign = () => {
    
    let {id}=useParams();

    return (
        <div>
            <div className="container">
                <CampaignInfo campaignId={id}/>
            </div>
        </div>
    )
}

export default Campaign
