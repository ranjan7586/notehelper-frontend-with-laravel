import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Layout from '../Layout/Layout';
const Login = () => {

  const [auth,setAuth]=useAuth()
  const navigate = useNavigate();
  const location=useLocation();
  const [loading, setLoading] = useState(false); // Add a loading state
  const [user, setUser] = useState({
    email: "", password: ""
  });
  let name, value;
  const handleInputs = (e) => {

    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }
  console.log(user);
  // form submission
  const getData = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { email, password } = user;

    const res = await fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });
    const data = await res.json();
    const dataStatus = await res.status;
    console.log(data);
    console.log(data.message);
    console.log(dataStatus);

    if (dataStatus === 400 || !data) {
      toast.error(data.message);
      // window.alert(data.message)
      console.log(data.message);
      setLoading(false)
    }
    else if (dataStatus === 401 || !data) {
      toast.error(data.message);
      console.log(data.message)
      setLoading(false)
    }
    else {
      await toast.success("Login Successful");
      console.log(data.message)
      setAuth({...auth,user:data.user,token:data.token})
      localStorage.setItem('auth',JSON.stringify(data));
      navigate(location.state || "/");
      setLoading(false)
      // history.push("/login");
    }
  }

  return (
    <>
    <Layout title={"Log in notehelper"}>
     <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="contact_taital">Log In</h1>
              <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="contact_section_2">
            <div className="row">
              <div className="col-md-12">
                <form onSubmit={getData} className="mail_section_1">
                  <input type="text" className="mail_text" placeholder="Enter Your Email" name="email" value={user.email} onChange={handleInputs} />
                  <input type="password" className="mail_text" placeholder="Enter Your Password" name="password" value={user.password} onChange={handleInputs} />
                  <NavLink to='/forgot-password' type="checkbox" name="" id="" className=""><span className='span1 mail_text1'>Forgot Password</span></NavLink>
                  <button type="submit" className="submit-btn">{loading?"Logging in...":"Log in"}</button>
                  <button type="submit" onClick={()=>navigate("/registration")} className="submit-btn">Registration</button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>

  )
}

export default Login
