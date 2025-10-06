    import React, { useContext, useState } from 'react'
    import './addReward.css'
import Joi from 'joi';
import { AppContext } from '../../context/AppContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

    const AddRewardTeir = () => {

    let {id}=useParams();
    const [rewardteirData, setRewardteirData] = useState({
        campaign_id:id,
        title: '',
        description: '',
        pledge_amount: '',
        quantity_claimed: '',
        quantity_available: '',
    })

    let {userLogged}=useContext(AppContext);

    let [showAddMReward,setShowReward]= useState(true);
        let [errors,setErrors]=useState({});

    const handleChange = (e) => {
        const { name, value } = e.target
        setRewardteirData({ ...rewardteirData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(formValidation().error) {
            setErrors(getErrors(formValidation().error.details));
            // console.log(errors);
        }
        else {
            // add request
            console.log(rewardteirData)
            rewardteir_mutation.mutate();
            setShowReward((old)=> !old);
        }
    }

    // request to add rewairdteir

    let rewardteir_mutation=useMutation({
        mutationKey:['postRewardteir'],
        mutationFn: ()=> axios.post(`/reward_tiers`,
            {...rewardteirData,campaign_id:id}),

        onSuccess: ()=> {
            toast.success('Campaign Rewardteir is added successfully');
            clearData();
        },

        onError: (error)=> {
            console.log(error)
            toast.error('please try again');
        }
    })


    let formValidation = ()=> {
            let schema = Joi.object({
                title : Joi.string().required().pattern(/^[A-Za-z\s]+$/).messages({
                    'string.empty' : 'Title is required',
                    'string.pattern.base': 'Title must contain only letters and spaces',
                }),
                description : Joi.string().required().pattern(/^[A-Za-z\s]+$/).messages({
                    'string.empty' :'Description is required',
                    'string.pattern.base': 'Description must contain only letters and spaces',
                }),
                quantity_claimed : Joi.number().required().min(0).messages({
                    'string.empty' : 'Quantity Claimed is required',
                    'number.base': 'Quantity Claimed must be a number.',
                    'number.min' : 'Quantity Claimed must be a positive number.'
                }),
                pledge_amount : Joi.number().required().min(0).messages({
                    'string.empty' : 'Pledge Amount is required',
                    'number.base': 'Pledge Amount must be a number.',
                    'number.min' : 'Pledge Amount must be a positive number.'
                }),
                quantity_available : Joi.number().required().min(0).messages({
                    'string.empty' : 'Quantity Available is required',
                    'number.base': 'Quantity Available must be a number.',
                    'number.min' : 'Quantity Available must be a positive number.'
                }),
                
            })
    
            return schema.validate({title: rewardteirData.title,
                description : rewardteirData.description,
                quantity_claimed : rewardteirData.quantity_claimed,
                pledge_amount : rewardteirData.pledge_amount,
                quantity_available : rewardteirData.quantity_available,
            },{abortEarly : false});
        }
    
            //get errors of validation
        let getErrors = (details)=> {
            const errors = {};
            details.forEach((err) => {
                const field = err.path?.[0];
                if (field && !errors[field]) {
                    errors[field] = err.message;
                }
            });
            // console.log(errors)
            return errors;
        }
        // clear data after submit
        // 
        let clearData = ()=> {
            setRewardteirData({
                campaign_id: id,
                title: '',
                description: '',
                pledge_amount: '',
                quantity_claimed: '',
                quantity_available: '',
            });
            setErrors({});
        }

        

        let addBtnFunction=()=> {
            if(userLogged) {
                setShowReward((old)=> !old);
            }
            else {
                toast.error('Please sign or register');
            }
        }


    if(showAddMReward) 
        return (
            <button className='showAddRewardForm' onClick={()=> addBtnFunction()}>add rewardteir</button>
    )

    return (
        <div className="container">
        <form className="reward-form" onSubmit={handleSubmit}>
            <h2>Add Reward Tier</h2>

            <label>Reward Title</label>
            <input
            type="text"
            name="title"
            value={rewardteirData.title}
            onChange={handleChange}
            />
            {errors.title && <p className='error'>{errors.title}</p>}
            <label>Description</label>
            <textarea
            name="description"
            value={rewardteirData.description}
            onChange={handleChange}
            rows="4"
            ></textarea>
            {errors.description && <p className='error'>{errors.description}</p>}
            <label>Pledge Amount ($)</label>
            <input
            type="text"
            name="pledge_amount"
            value={rewardteirData.pledge_amount}
            onChange={handleChange}
            />
            {errors.pledge_amount && <p className='error'>{errors.pledge_amount}</p>}
            <label>Quantity Claimed</label>
            <input
            type="text"
            name="quantity_claimed"
            value={rewardteirData.quantity_claimed}
            onChange={handleChange}
            />
            {errors.quantity_claimed && <p className='error'>{errors.quantity_claimed}</p>}
            <label>Quantity Available</label>
            <input
            type="text"
            name="quantity_available"
            value={rewardteirData.quantity_available}
            onChange={handleChange}
            />
            {errors.quantity_available && <p className='error'>{errors.quantity_available}</p>}
            <button type="submit">Submit</button>
        </form>
        </div>
    )
    }

    export default AddRewardTeir
