import React, { useEffect, useState } from 'react'
import {useQuery} from '@tanstack/react-query'
import './styleOfPages/campaigns.css'
import axios from 'axios';
import CampaignCard from '../components/campaignCard/CampaignCard';
import { Link } from 'react-router';
import Error from '../components/error/Error';
import Loading from '../components/loading/Loading';

const Campaigns = () => {
    let [campaigns,setCampaigns]=useState([
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'successful',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'failed',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'successful',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'failed',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'successful',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'active',
        },
        {
            title : 'campaing name',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis delectus et praesentium asperiores, voluptates neque dolores? Cumque suscipit eligendi doloribus laboriosam fugiat, consequatur facere ducimus quae temporibus tempore magnam!',
            funding_goal : 20000,
            current_funds : 15000,
            deadline : '21/12/2025',
            status : 'failed',
        },
    ]);

    let {data,isError, isLoading} =useQuery({
        queryKey : ['getCampaigns'],
        queryFn : ()=> axios.get('/campaigns'),
    })

    // console.log(data.data);


    useEffect(()=> {
        // setCampaigns(data.data);
    },[])


    if(isLoading) return <Loading/>
    if(isError) return <Error/>

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
