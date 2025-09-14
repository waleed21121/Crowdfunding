import React, { useEffect, useState } from 'react'
import './showRewardTeir.css'
import { rewardTeirsData } from '../../assets/assets'
import RewardTeirCard from '../rewardTeirCard/RewardTeirCard';

const ShowRewardTeir = ({campaignId}) => {
    let [rewardteirs,setRewardteir]=useState(rewardTeirsData);

    useEffect(()=> {
        // add req to get rewardteir of campaign with campaignId
    },[])
    return (
        <div  className='rewardTeir-container'>
            <h1>campaign rewardTeir</h1>
            <div className="rewardTeirs">
                {
                    rewardteirs.map((re,i)=> <RewardTeirCard key={i} rewardTeir={re}/>)
                }
            </div>
        </div>
    )
}

export default ShowRewardTeir
