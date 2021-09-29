import { createContext,useState } from "react";

export const AppStateContext = createContext()


export const AppStateContextProvider = ({children}) =>{


    const [LoggedInUser,setLoggedInUser] = useState([])

    return (

<AppStateContext.Provider  value={{LoggedInUser,setLoggedInUser}}>

{children}

</AppStateContext.Provider>

    )



}

