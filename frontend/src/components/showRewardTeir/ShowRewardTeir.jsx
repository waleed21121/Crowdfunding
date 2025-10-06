import React, { useEffect, useState } from 'react'
import './showRewardTeir.css'
import { rewardTeirsData } from '../../assets/assets'
import RewardTeirCard from '../rewardTeirCard/RewardTeirCard';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import axios from 'axios';
import Empty from '../emptyContainer/Empty';

const ShowRewardTeir = () => {
    let [rewardteirs,setRewardteir]=useState(rewardTeirsData);
    let {id}=useParams();

    let {data,isLoading,isError,error}=useQuery({
        queryKey: ['getCampaignRewardteirs'],
        queryFn : async ()=> {
            let res= await axios.get(`/campaigns/${id}/reward_tiers`);
            return res.data;
        }
    })

    if(error && error.status===404) return <Empty message={'there is no rewardtiers for this campaign'}/>
    if(isLoading) return <Loading/>
    if(isError) return <Error/>



    
    return (
        <div  className='rewardTeir-container'>
            <h1>campaign rewardTeir</h1>
            <div className="rewardTeirs">
                {
                    // rewardteirs.map((re,i)=> <RewardTeirCard key={i} rewardTeir={re}/>)
                    data.data.map((re,i)=> <RewardTeirCard key={i} rewardTeir={re}/>)
                }
            </div>
        </div>
    )
}

export default ShowRewardTeir
