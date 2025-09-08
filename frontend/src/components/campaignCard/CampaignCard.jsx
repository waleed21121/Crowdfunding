import React from 'react'
import './card.css'

const CampaignCard = ({campaign}) => {
    return (
        <div className='campaignCard'>
            <h1 className="title">{campaign.title}</h1>
            <p className="fundingGoal">funding goal <span>{campaign.funding_goal}$</span></p>
            <p className='currentFund'>current funding <span>{campaign.current_funds}$</span></p>
            <p className='deadline'>deadline <span>{campaign.deadline}</span></p>
            <p className={`status ${campaign.status}`}>{campaign.status}</p>
        </div>
    )
}

export default CampaignCard
