import React from 'react'
import './style.css'
import { MdErrorOutline } from "react-icons/md";

const Error = () => {
    return (
        <div className='error_page'>
            <MdErrorOutline className='icon'/>
            <p>something went wrong, please refresh the page</p>
        </div>
    )
}

export default Error
