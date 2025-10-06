import React, { useContext } from 'react'
import './header.css'
import {Link} from 'react-router'
import { FiPlus } from "react-icons/fi";
import { AppContext } from '../../context/AppContext';

const Header = () => {
    let {userLogged,setUserLogged,setUserData}=useContext(AppContext);

    function handle_Log_out () {
        setUserLogged(false);
        setUserData({})
        localStorage.setItem("saveLogin",false);
        localStorage.setItem("currentUser",JSON.stringify({}));
    }

    

    return (
        <header>
            <div className="container">
                <Link to={'/add-project'} className="addProject">
                    <FiPlus className='icon'/>
                    <p>new project</p>
                </Link>
                <h1><Link to={'/'}>kickstarter</Link></h1>
                {!userLogged ? <Link to={'/login'}>Sign in</Link> :
                <Link to={'/'} onClick={()=> handle_Log_out()}>Log out</Link> }
            </div>
        </header>
    )
}

export default Header
