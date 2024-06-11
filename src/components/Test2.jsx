import React, { useContext, useState } from 'react'
import { MyContext, useAuthTest } from './Mycontext';
const Test2 = () => {
    const [auth,setAuth]=useAuthTest();
//   console.log(text)
    return (
        <div>
            <div>
                <h1>{auth.user}</h1>
              
            </div>
        </div>
    )
}

export default Test2
