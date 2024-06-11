import React, { useContext, useState } from 'react'
import { MyContext, useAuthTest } from './Mycontext';
const Test = () => {
    const [auth,setAuth]=useAuthTest();
//   console.log(text)
    return (
        <div>
            <div>
                <h1>{auth.user}</h1>
                <button onClick={() => setAuth({...auth,user:"Sumana",token:123456})}>
                    Click me
                </button>
            </div>
        </div>
    )
}

export default Test
