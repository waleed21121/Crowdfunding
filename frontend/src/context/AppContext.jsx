import { createContext, useState } from "react";

export let AppContext=createContext();


const AppContextProvider = ({children}) => {

    let [userLogged,setUserLogged]=useState(()=> {
        let login=JSON.parse(localStorage.getItem("saveLogin"));
        return login ? true : false;
    });
    let [userData,setUserData]=useState(()=> {
        let user=JSON.parse(localStorage.getItem("currentUser"));
        return user ? user : {};
    });



    let data = {
        userLogged,
        setUserLogged,
        userData,
        setUserData,
    }

    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
