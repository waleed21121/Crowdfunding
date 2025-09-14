import React from 'react'
import './card.css'

const RewardTeirCard = ({rewardTeir}) => {
    return (
        <div className='rewardTeir'>
            <h1 className="title">{rewardTeir.title}</h1>
            <p className="description">{rewardTeir.description}</p>
            <p className='quantity_claimed'>quantity claimed : <span>{rewardTeir.quantity_claimed}</span></p>
            <p className='quantity_available'>quantity available : <span>{rewardTeir.quantity_available}</span></p>
            <p className='pledge_amount'>pledge amount : <span>{rewardTeir.pledge_amount}</span></p>
        </div>
    )
}

export default RewardTeirCard
