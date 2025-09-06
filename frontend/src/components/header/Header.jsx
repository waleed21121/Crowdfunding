import React from 'react'
import './header.css'
import {Link} from 'react-router'
import { FiPlus } from "react-icons/fi";

const Header = () => {
    return (
        <header>
            <div className="container">
                <Link to={'/add-project'} className="addProject">
                    <FiPlus className='icon'/>
                    <p>start a new project</p>
                </Link>
                <h1><Link to={'/'}>kickstarter</Link></h1>
                <Link to={'/login'}>sign in</Link>
            </div>
        </header>
    )
}

export default Header
