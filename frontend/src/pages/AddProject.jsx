import React, { useContext, useState } from 'react'
import './styleOfPages/addProject.css'
import Joi, { number, string } from 'joi'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const AddProject = () => {
    const [newCampaignData, setNewCampaignData] = useState({
        title: '',
        description: '',
        funding_goal: '',
        deadline: ''
    });
    let [errors,setErrors]=useState({});
    let {userData,userLogged}=useContext(AppContext);


    const handleChange = (e) => {
        const { name, value } = e.target
        setNewCampaignData({ ...newCampaignData, [name]: value })
    }

    let projectMutation=useMutation({
        mutationKey : ['add_project'],
        mutationFn: (project_data)=> axios.post('http://localhost:3000/api/v1/campaigns',
            {
                ...project_data,
                user_id : userData.id,
                current_funds: userData.current_funds,
                status : 'active'
            }
            ,{headers: {"Content-Type": 'application/json'}}
        ),

        onSuccess: ()=> {
            toast.success("The new campaign is added successfully");
            console.log('added');
        },

        onError : ()=> {
            toast.error("Please try again");
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(validateForm().error) {
            setErrors(getErrors(validateForm().error.details));
            // console.log(errors);
        }
        else if(!userLogged) {
            toast.error("Please Login First");
        }
        else {
            // add request
            projectMutation.mutate(newCampaignData)
            // addRequest();
            clearData();
        }
    }

    // add request 
    // let addRequest =async function() {
    //     let data = {
    //         ...newCampaignData,
    //         user_id : userData.id,
    //         current_funds: userData.current_funds,
    //         status : 'active'
    //     }
        
    //     let response=await axios.post('http://localhost:3000/api/v1/campaigns',data);

    //     console.log(response);
    //     let resData=await response.data;
    //     console.log(resData);
    //     if(resData.success) {
    //         toast.success("The new campaign is added successfully");
    //     }
    //     else {
    //         toast.error("Please try again");
    //     }



    //         // fetch('http://localhost:3000/api/v1/campaigns',{
    //         //     method : "POST",
    //         //     body: JSON.stringify(data),
    //         //     headers : {
    //         //         "Content-Type" : 'application/json'
    //         //     }
    //         // }).then((res)=> {console.log(res) ; return res.json()}).then((data)=> console.log(data))
    // }


    // add validation 
    let validateForm = () => {
        let schema = Joi.object({
            title : Joi.string().required().pattern(/^[A-Za-z\s]+$/).messages({
                'string.empty' : 'Title is required',
                'string.pattern.base': 'Title must contain only letters and spaces',
            }),
            description : Joi.string().required().pattern(/^[A-Za-z\s]+$/).messages({
                'string.empty' :'Description is required',
                'string.pattern.base': 'Description must contain only letters and spaces',
            }),
            funding_goal : Joi.number().required().min(0).messages({
                'string.empty' : 'Funding Goal is required',
                'number.base': 'Funding Goal must be a number.',
                'number.min' : 'Funding Goal must be a positive number.'
            }),
            deadline: Joi.date().greater('now').required().messages({
                'date.empty' : 'Deadline is required',
                'date.base': 'Deadline must be a valid date format',
                'date.greater': 'Deadline must be in the future'
            })
        });

        return schema.validate(newCampaignData,{abortEarly : false});
    }

    //get errors of validation
    let getErrors = (details)=> {
        const errors = {};
        details.forEach((err) => {
            const field = err.path?.[0];
            if (field && !errors[field]) {
                errors[field] = err.message.replace(/\"/g, "");
            }
        });
        // console.log(errors)
        return errors;
    }
    // clear data after submit
    // 
    let clearData = ()=> {
        setNewCampaignData({
            title: '',
            description: '',
            funding_goal: '',
            deadline: ''
        });
        setErrors({});
    }

    
    return (
        <div className="addProject">
            <div className="container">
                <form className="project-form" onSubmit={handleSubmit}>
                    <h2>Add Project</h2>

                    <label>Title</label>
                    <input
                    type="text"
                    name="title"
                    value={newCampaignData.title}
                    onChange={handleChange}
                    />
                    {errors.title && <p className="error">{errors.title}</p>}
                    <label>Description</label>
                    <textarea
                    name="description"
                    rows="4"
                    value={newCampaignData.description}
                    onChange={handleChange}
                    />
                    {errors.description &&<p className="error">{errors.description}</p>}
                    <label>Funding Goal ($)</label>
                    <input
                    type="text"
                    name="funding_goal"
                    value={newCampaignData.funding_goal}
                    onChange={handleChange}
                    />
                    {errors.funding_goal &&<p className="error">{errors.funding_goal}</p>}
                    <label>Deadline</label>
                    <input
                    type="date"
                    name="deadline"
                    value={newCampaignData.deadline}
                    onChange={handleChange}
                    />
                    {errors.deadline &&<p className="error">{errors.deadline}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddProject

