import React, { useEffect, useState } from 'react'
import './showMilestones.css'
import { mileStonesData} from '../../assets/assets'
import MilestoneCard from '../milestoneCard/MilestoneCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../loading/Loading';
import Error from '../error/Error';
import { useParams } from 'react-router';
import Empty from '../emptyContainer/Empty';

const ShowMilestones = () => {
    let [milestones,setMilestone]=useState([...mileStonesData]);
    let {id}=useParams();

    let {data,isLoading,isError,error}=useQuery({
        queryKey: ['getCampaignMilestone'],
        queryFn : async ()=> {
            let res= await axios.get(`/campaigns/${id}/milestones`);
            return res.data;
        }
    })


    console.log(error);
    if(error && error.status===404) return <Empty message={'there is no milestones for this campaign'}/>
    if(isLoading) return <Loading/>
    if(isError) return <Error/>


    // if(data.data.data.length<=0) return <Empty message={"there is no milestones for this campaign"}/>

    return (
        <div className='milestones-container'>
            <h1>campaign milestones</h1>
            <div className="milestones">
                {
                    //milestones.map((mile,i)=> <MilestoneCard milestone={mile} key={i}/>)
                    data.data.map((mile,i)=> <MilestoneCard milestone={mile} key={i}/>)
                }
            </div>
        </div>
    )
}

export default ShowMilestones
