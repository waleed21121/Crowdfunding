import React, { useContext, useState } from 'react'
import './addMilestone.css'
import Joi from 'joi'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { useParams } from 'react-router'

const AddMilestone = () => {
    let {id}=useParams();
    const [milstoneData, setMilstoneData] = useState({
        title: '',
        target_amount: '',
        achieved: 'false',
        campaign_id:id,
    })
    let [showAddMilestone,setShowMilstone]= useState(true);
    let [errors,setErrors]=useState({});
    let {userLogged}=useContext(AppContext);

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
            console.log(milstoneData)
            milestone_mutation.mutate();
            setShowMilstone((old)=> !old);
        }
    }


    // add request to get add campaign milestone
    let milestone_mutation=useMutation({
            mutationKey:['postMilestone'],
            mutationFn: ()=> axios.post(`http://localhost:3000/api/v1/milestones`,
                milstoneData,{headers:{'Content-Type' : 'application/json'}}
            ),
    
            onSuccess: ()=> {
                toast.success('Campaign Milestone is added successfully');
                clearData();
            },
    
            onError: (error)=> {
                console.log(error)
                toast.error('please try again');
            }
        })
    
    
    // add validation
    let formValidation = ()=> {
        let schema = Joi.object({
            title : Joi.string().required().pattern(/^[A-Za-z\s]+$/).messages({
                'string.empty' : 'Title is required',
                'string.pattern.base': 'Title must contain only letters and spaces',
            }),
            target_amount : Joi.number().required().min(0).messages({
                'string.empty' : 'Target Amount is required',
                'number.base': 'Target Amount must be a number.',
                'number.min' : 'Target Amount must be a positive number.'
            }),
        })

        return schema.validate({title :milstoneData.title,target_amount: milstoneData.target_amount},{abortEarly : false});
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
        setMilstoneData({
            campaign_id: id,
            title: '',
            target_amount: '',
            achieved: false
        });
        setErrors({});
    }

    let addBtnFunction=()=> {
        if(userLogged) {
            setShowMilstone((old)=> !old);
        }
        else {
            toast.error('Please Sign or Register');
        }
    }


    if(showAddMilestone)
        return (
            <button className='showAddMilestoneForm' type="button" onClick={()=> addBtnFunction()}>add milestone</button>
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
            name="target_amount"
            value={milstoneData.target_amount}
            onChange={handleChange}
            />
            {errors.target_amount && <p className='error'>{errors.target_amount}</p>}
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
