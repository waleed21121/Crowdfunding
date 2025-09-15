import React, { useState } from 'react'
import './addMilestone.css'
import Joi from 'joi'

const AddMilestone = ({campaignId}) => {
    const [milstoneData, setMilstoneData] = useState({
        title: '',
        targetAmount: '',
        achieved: 'false'
    })
    let [showAddMilestone,setShowMilstone]= useState(true);
    let [errors,setErrors]=useState({});

    const handleChange = (e) => {
        const { name, value } = e.target
        setMilstoneData({ ...milstoneData, [name]: value })
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
                ...milstoneData
            });
            clearData();
            setShowMilstone((old)=> !old);
        }
    }



    // add validation 

    let formValidation = ()=> {
        let schema = Joi.object({
            title : Joi.string().required().pattern(/^[A-Za-z\s]+$/).messages({
                'string.empty' : 'Title is required',
                'string.pattern.base': 'Title must contain only letters and spaces',
            }),
            targetAmount : Joi.number().required().min(0).messages({
                'string.empty' : 'Target Amount is required',
                'number.base': 'Target Amount must be a number.',
                'number.min' : 'Target Amount must be a positive number.'
            }),
        })

        return schema.validate({title :milstoneData.title,targetAmount: milstoneData.targetAmount},{abortEarly : false});
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
        setMilstoneData({
            title: '',
            targetAmount: '',
            achieved: 'false'
        });
        setErrors({});
    }



    if(showAddMilestone) 
        return (
            <button className='showAddMilestoneForm' onClick={()=> setShowMilstone((old)=> !old)}>add milestone</button>
    )

    return (
        <div className="container">
        <form className="milestone-form" onSubmit={handleSubmit}>
            <h2>Add Milestone</h2>

            <label>Milestone Title</label>
            <input
            type="text"
            name="title"
            value={milstoneData.title}
            onChange={handleChange}
            />
            {errors.title && <p className='error'>{errors.title}</p>}
            <label>Target Amount ($)</label>
            <input
            type="text"
            name="targetAmount"
            value={milstoneData.targetAmount}
            onChange={handleChange}
            />
            {errors.targetAmount && <p className='error'>{errors.targetAmount}</p>}
            <label>Achieved?</label>
            <div className="radio-group">
            <label>
                <input
                type="radio"
                name="achieved"
                value="true"
                checked={milstoneData.achieved === 'true'}
                onChange={handleChange}
                />
                Yes
            </label>
            <label>
                <input
                type="radio"
                name="achieved"
                value="false"
                checked={milstoneData.achieved === 'false'}
                onChange={handleChange}
                />
                No
            </label>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default AddMilestone
