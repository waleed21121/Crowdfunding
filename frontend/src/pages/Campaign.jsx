import React, { useEffect, useState } from 'react'
import CampaignInfo from '../components/campainAllInfo/CampaignInfo'
import {useParams} from 'react-router'
import AddMilestone from '../components/addMilestone/AddMilestone';
import AddRewardTeir from '../components/addRewardTeir/AddRewardTeir';
import ShowRewardTeir from '../components/showRewardTeir/ShowRewardTeir';
import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import { useQuery } from '@tanstack/react-query';
import ShowMilestones from '../components/showMilestones/ShowMilestones';
import axios from 'axios';
import Empty from '../components/emptyContainer/Empty';

const Campaign = () => {
    
    let {id}=useParams();


    let {data,isLoading,isError,error } = useQuery({
        queryKey:['getOneCampaignData'],
        queryFn : async ()=> {
            let res= await axios.get(`/campaigns/${id}`)
            return res.data;
        }
        
    })

    if(error && error.status===404) return <Empty message={'there is no milestones for this campaign'}/>
    if(isLoading) return <Loading/>
    if(isError) return <Error/>


    // useEffect(()=> {
    //     fetch(`http://localhost:3000/api/v1/campaigns/${id}`,{
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((res)=> {
    //         console.log(res);
    //         console.log(res.json())
    //         return res.json();
    //     }).then((data)=> {
    //         console.log(data);
    //     }).catch((err)=> console.log(err));

    // },[])


    return (
        <div>
            <div className="container">
                <CampaignInfo campaign={data.data}/>
                <ShowMilestones/>
                <AddMilestone />
                <ShowRewardTeir />
                <AddRewardTeir />
            </div>
        </div>
    )
}

export default Campaign
