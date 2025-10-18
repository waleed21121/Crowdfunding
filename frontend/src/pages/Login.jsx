import React, { useContext, useState } from 'react'
import './styleOfPages/login.css'
import Joi from 'joi'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

const Login = () => {
    const [isSignUp,setIsSignUp]=useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        balance: '',
        name: '',
    })
    const [errors,setErrors] =useState({});
    let {setUserData,setUserLogged,userData}=useContext(AppContext);

    let userMutation=useMutation({
        mutationKey : ['login_register'],
        mutationFn: (userData)=> axios.post(`/users/${isSignUp? 'register' : 'login'}`,userData),
        
        onSuccess: (res)=> {
            console.log(res.data)
            setUserLogged(true);
            setUserData(res.data.data);
            toast.success(res.data.message);
            if(isSignUp) toast.info("We send to you a verfication email, please verify you email")
            localStorage.setItem("saveLogin",JSON.stringify(true));
            localStorage.setItem("currentUser",JSON.stringify(res.data.data));
            clearData();
        },

        onError: (error) => {
            console.log(error)
            console.log('no login')
            toast.error(error.response.data.error);
        }
    })


    let {mutate , error} =useMutation({
        mutationKey :['get_users'],
        mutationFn: ()=> axios.get('/users',{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json',
            }
        }),

        onSuccess: (res)=> {
            console.log(res);
        },
        
        onError: (error)=> {
            console.log(error);
        }
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateFrom().error) {
            setErrors(getErrors(validateFrom().error.details));
            return;
        }
        else {
            // add request
            userMutation.mutate(formData);
            setTimeout(()=> {
                mutate();
            },1000)
            // addNewUser(formData);
        }
    }


    // validate from
    let validateFrom =()=> {
        let schema = Joi.object({
            name : Joi.string().required().min(3).messages({
                'string.empty': 'Name is required.',
                'string.min': 'First name must be at least 3 characters.',
            }),
            password : Joi.string().required().messages({
                'string.empty': 'Password is required.',
            }),
            email : Joi.string().email({ tlds: { allow: false } }).required().messages({
                'string.empty': 'Email is required.',
                'string.email': 'Please enter a valid email address.',
            }),
            balance : Joi.number().required().min(0).messages({
                'string.empty': 'Balance is required.',
                'string.min': 'Balance must be greater than or equal zero',
                'number.base': 'Balance must be a number.',
            })
        });


        return schema.validate(formData,{abortEarly: false});
    }

    // get errors of validation
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

    // clear form after submit
    let clearData = ()=> {
        setFormData({
            name: '',
            email: '',
            password: '',
            balance: ''
        });
        setErrors({});
    }

    // register or login
    // let addNewUser = async (userData)=> {
    //     console.log(userData)
    //     axios.post(`http://localhost:3000/api/v1/users/${isSignUp? 'register' : 'login'}`, userData, {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     }).then((res) => {
    //         console.log(res);
    //         console.log(res.data);

    //         if(res.data.success) {
    //             setUserLogged(true);
    //             setUserData(res.data.data);
    //             toast.success(res.data.message);
    //             // console.log(res.data.data);
    //         }
    //     }).catch((err) => {
    //         toast.error('Please verify your email');
    //         console.error("Error:", err.response?.data || err.message);
    //     });
    // }



    //     // fetch('http://localhost:3000/api/v1/users/register',{
    //     //     method : 'POST',
    //     //     body : JSON.stringify(userData),
    //     //     headers : {
    //     //         'Content-Type' : 'application/json',
    //     //     }
    //     // }).then((res)=> { console.log(res); return res.json()}).then((data)=> console.log(data));
    // }






    return (
        <div className="container">
        <form className="login-form" onSubmit={(e)=> handleSubmit(e)}>
            {isSignUp? <h2>sign up</h2> : <h2>Log in</h2>}

            <label>Name</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            />
            {errors.name && <p className='error'>{errors.name}</p>}

            <label>Email</label>
            <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
            {errors.email && <p className='error'>{errors.email}</p>}

            <label>Password</label>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
            {errors.password && <p className='error'>{errors.password}</p>}

            <label>Balance ($)</label>
            <input
            type="text"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            />
            {errors.balance && <p className='error'>{errors.balance}</p>}
            <div className="haveAccount">
                <p>{isSignUp? 'have an account?' : 'new user?' }</p>
                <button onClick={()=> setIsSignUp((old)=> !old)} type='button'>click here</button>
            </div>

            <button type='submit'>Submit</button>
        </form>
        </div>
    )
}

export default Login
