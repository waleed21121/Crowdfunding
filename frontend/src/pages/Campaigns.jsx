import React, { useEffect, useState } from 'react'
import {useQuery} from '@tanstack/react-query'
import './styleOfPages/campaigns.css'
import axios from 'axios';
import CampaignCard from '../components/campaignCard/CampaignCard';
import { Link } from 'react-router';
import Error from '../components/error/Error';
import Loading from '../components/loading/Loading';
import { campaignsData } from '../assets/assets';

const Campaigns = () => {
    let [campaigns,setCampaigns]=useState(campaignsData);

    // let {data,isError, isLoading} =useQuery({
    //     queryKey : ['getCampaigns'],
    //     queryFn : ()=> axios.get('http://localhost:3000/api/v1/campaigns',{headers: {
    //         "Content-Type" : 'application/json'
    //     }}),
    // })
    // console.log(data)

    let getData= async ()=> {
        fetch('',{headers: {"Content-Type" : 'application/json'}}).then((res)=> {
            console.log(res);
            return res.json();
        }).then((data)=> {console.log(data)})
    }

useEffect(()=> {
    getData();
})



    // if(isLoading) return <Loading/>
    // if(isError) return <Error/>

    return (
        <div className='allCampaigns'>
            <div className="container">
                <h1>all campaigns</h1>
                <div className="campaigns">
                    {
                        campaigns.map((cam,i)=> <Link to={`/campaign/${i+1}`} key={i}><CampaignCard campaign={cam} key={i}/></Link>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Campaigns
