import React, { useEffect, useState } from 'react'
import './showMilestones.css'
import { mileStonesData, rewardTeirsData } from '../../assets/assets'
import RewardTeirCard from '../rewardTeirCard/RewardTeirCard';
import MilestoneCard from '../milestoneCard/MilestoneCard';

const ShowMilestones = ({campignId}) => {
    let [milestones,setMilestone]=useState([...mileStonesData]);

    useEffect(()=> {
        // add req to get milestone of campaign with id -> campignId
    })


    return (
        <div className='milestones-container'>
            <h1>campaign milestones</h1>
            <div className="milestones">
                {
                    milestones.map((mile,i)=> <MilestoneCard milestone={mile} key={i}/>)
                }
            </div>
        </div>
    )
}

export default ShowMilestones
