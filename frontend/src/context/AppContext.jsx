import { createContext, useState } from "react";

export let AppContext=createContext();


const AppContextProvider = ({children}) => {

    let [userLogged,setUserLogged]=useState(()=> {
        let login=localStorage.getItem("saveLogin");
        return login ? true : false;
    });
    let [userData,setUserData]=useState(()=> {
        let user=localStorage.getItem("saveLogin");
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
