import React from 'react'
import './card.css'

const CampaignCard = ({campaign}) => {
    return (
        <div className='campaignCard'>
            <div className="title">
                <h1 className="name">{campaign.title}</h1>
                <p className="funingGoal">{campaign.funding_goal}$</p>
            </div>
            <div className="currentFunds">
                <p className='currentFund'>{campaign.current_funds}</p>
                <p className='deadline'>{campaign.deadline}</p>
            </div>
            <p className={`status ${campaign.status}`}>{campaign.status}</p>
        </div>
    )
}

export default CampaignCard
