import { Children, createContext, useContext, useState } from "react";

const MyContext=createContext();
const MyProvider=({children})=>{
    const [auth, setAuth] = useState({
        user: "Ranjan",
        token: ""
      });
    return (
        <MyContext.Provider value={[auth,setAuth]} >
            {children}
        </MyContext.Provider>
    );
}
const useAuthTest=()=>useContext(MyContext);
export {useAuthTest,MyProvider};