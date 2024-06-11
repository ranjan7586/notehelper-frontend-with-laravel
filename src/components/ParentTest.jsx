import React, { useState } from 'react'
import { MyContext, MyProvider } from './Mycontext'
import Test from './Test';
import Test2 from './Test2';

const ParentTest = () => {
    const [text, setText] = useState("ranjan jana");
    console.log(text);
  return (
      <MyProvider>
        <Test/>
        <Test2/>
      </MyProvider>
  )
}

export default ParentTest
