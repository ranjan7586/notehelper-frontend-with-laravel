import React from 'react'
import Layout from '../Layout/Layout'
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '../App.css';
import { useState } from 'react';
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "", answer: "", newPassword: ""
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

        const { email, answer, newPassword } = user;

        const res = await fetch("/api/v1/forgotpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, answer, newPassword
            })
        });
        const data = await res.json();
        const dataStatus = await res.status;
        // console.log(data);
        console.log(data.message);
        console.log(dataStatus);

        if (dataStatus === 404 || !data) {
            toast.error(data.message);
            // window.alert(data.message)
            console.log(data.message);
        }
        else if (dataStatus === 400 || !data) {
            toast.error(data.message);
            console.log(data.message)
        }
        else {
            await toast.success("Password Reset Successful");
            console.log(data.message)
            //   setAuth({...auth,user:data.user,token:data.token})
            //   localStorage.setItem('auth',JSON.stringify(data));
            navigate("/login");
            // history.push("/login");
        }
    }
    return (
        <>
        <Layout title={"forgot password notehelper"}>
            <div className="contact_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="contact_taital">Reset Password</h1>
                            <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="contact_section_2">
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={getData} className="mail_section_1">
                                    <input type="email" className="mail_text" placeholder="Enter Your Email" name="email" value={user.email} onChange={handleInputs} />
                                    <input type="text" className="mail_text" placeholder="Enter Your Favourite Teacher's Name" name="answer" value={user.answer} onChange={handleInputs} />
                                    <input type="password" className="mail_text" placeholder="Enter Your New Password" name="newPassword" value={user.newPassword} onChange={handleInputs} />
                                    {/* <NavLink to='/forgot-password' type="checkbox" name="" id="" className=""><span className='span1 mail_text1'>Forgot Password</span></NavLink> */}
                                    <button type="submit" className="submit-btn">Reset</button>
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

export default ForgotPassword
