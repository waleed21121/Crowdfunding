import React, { useState } from 'react'
import './styleOfPages/addProject.css'
import Joi, { string } from 'joi'

const AddProject = () => {
    const [newCampaignData, setNewCampaignData] = useState({
        title: '',
        description: '',
        fundingGoal: '',
        deadline: ''
    });

    let [errors,setErrors]=useState({});

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewCampaignData({ ...newCampaignData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(validateForm().error) {
            setErrors(getErrors(validateForm().error.details));
            // console.log(errors);
        }
        else {
            // add request
            console.log('added');
            clearData();
        }
    }


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
            fundingGoal : Joi.number().required().messages({
                'string.empty' : 'Funding Goal is required',
                'number.base': 'Funding Goal must be a number.'
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
            fundingGoal: '',
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
                    name="fundingGoal"
                    value={newCampaignData.fundingGoal}
                    onChange={handleChange}
                    />
                    {errors.fundingGoal &&<p className="error">{errors.fundingGoal}</p>}
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

