import React from 'react'
import './card.css'

const MilestoneCard = ({milestone}) => {
    return (
        <div className='milestone'>
            <h1 className="title">{milestone.title}</h1>
            <h2 className="target_amount">target amount : <span>{milestone.target_amount}</span></h2>
            <p className={`${milestone.achieved ? 'achieved' : 'notAchieved'}`}>{milestone.achieved ? 'achieved' : 'not achieved'}</p>
        </div>
    )
}

export default MilestoneCard
