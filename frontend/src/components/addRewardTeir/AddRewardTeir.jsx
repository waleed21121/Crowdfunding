    import React, { useState } from 'react'
    import './addReward.css'
import Joi from 'joi';

    const AddRewardTeir = ({ campaignId }) => {
    const [rewardteirData, setRewardteirData] = useState({
        title: '',
        description: '',
        pledgeAmount: '',
        quantityClaimed: '',
        quantityAvailable: '',
    })

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
            console.log('added',{
                campaignId,
                ...rewardteirData
            });
            clearData();
            setShowReward((old)=> !old);
        }
    }

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
                quantityClaimed : Joi.number().required().min(0).messages({
                    'string.empty' : 'Target Amount is required',
                    'number.base': 'Target Amount must be a number.',
                    'number.min' : 'Target Amount must be a positive number.'
                }),
                pledgeAmount : Joi.number().required().min(0).messages({
                    'string.empty' : 'Target Amount is required',
                    'number.base': 'Target Amount must be a number.',
                    'number.min' : 'Target Amount must be a positive number.'
                }),
                quantityAvailable : Joi.number().required().min(0).messages({
                    'string.empty' : 'Target Amount is required',
                    'number.base': 'Target Amount must be a number.',
                    'number.min' : 'Target Amount must be a positive number.'
                }),
                
            })
    
            return schema.validate(rewardteirData,{abortEarly : false});
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
            console.log(errors)
            return errors;
        }
        // clear data after submit
        // 
        let clearData = ()=> {
            setRewardteirData({
                title: '',
                description: '',
                pledgeAmount: '',
                quantityClaimed: '',
                quantityAvailable: '',
            });
            setErrors({});
        }


    if(showAddMReward) 
        return (
            <button className='showAddRewardForm' onClick={()=> setShowReward((old)=> !old)}>add rewardteir</button>
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
            name="pledgeAmount"
            value={rewardteirData.pledgeAmount}
            onChange={handleChange}
            />
            {errors.quantityClaimed && <p className='error'>{errors.quantityClaimed}</p>}
            <label>Quantity Claimed</label>
            <input
            type="text"
            name="quantityClaimed"
            value={rewardteirData.quantityClaimed}
            onChange={handleChange}
            />
            {errors.quantityClaimed && <p className='error'>{errors.quantityClaimed}</p>}
            <label>Quantity Available</label>
            <input
            type="text"
            name="quantityAvailable"
            value={rewardteirData.quantityAvailable}
            onChange={handleChange}
            />
            {errors.quantityAvailable && <p className='error'>{errors.quantityAvailable}</p>}
            <button type="submit">Submit</button>
        </form>
        </div>
    )
    }

    export default AddRewardTeir
