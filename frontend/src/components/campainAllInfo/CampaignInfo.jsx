import React, { useEffect, useState } from 'react'
import './campaignInfo.css'
import { campaignsData } from '../../assets/assets';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../loading/Loading';
import Error from '../error/Error';

const CampaignInfo = ({campaign}) => {

    return (
        <div className='info'>
            <div className="main">
                <h1 className="name">{campaign.title}</h1>
                <p className={`status ${campaign.status}`}>{campaign.status}</p>
            </div>

            <p className="description">{campaign.description}</p>
            <p className="funding_goal commonP">funding goal : <span>{campaign.funding_goal} $</span></p>
            <p className="current_funds commonP">current funds : <span>{campaign.current_funds} $</span></p>
            <p className="deadline commonP">deadline : <span>{campaign.deadline.slice(0,10)}</span></p>
            
        </div>
    )
}

export default CampaignInfo
