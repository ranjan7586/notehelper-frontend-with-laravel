import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Layout from '../../Layout/Layout';
const UserProfile = () => {
    //context
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
   const [name,setName]=useState("")
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const [cpassword,setCpassword]=useState("")
   const [answer,setAnswer]=useState("");

    useEffect(() => {
        const { name, email, answer } = auth?.user
        setName(name)
        setEmail(email)
        setAnswer(answer)
    }, [auth?.user])
    console.log(auth.user);
    // form submission
    const postData = async (e) => {
        e.preventDefault();
        try {
            console.log(name)
            const res = await axios.patch(`/api/v1/profile-update/${auth?.user.id}`, {name,email,password});
            console.log(res)
            let dataStatus = res.status;
            // console.log(data);
            console.log(res.message);
            console.log(dataStatus);
    
            if (dataStatus === 423) {
                toast.error(res.message)
                navigate("/login");
                // window.alert(data.message)
                console.log(res.message);
            }
            else if (dataStatus === 421) {
                toast.error(res.message);
                console.log(res.message)
            }
            else {
                setAuth({ ...auth, user: res?.data.updatedUser })
                let ls = localStorage.getItem('auth')
                ls = JSON.parse(ls)
                ls.user = res.data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success(res.data.message);
                console.log("User Profile Updated Suucessful")
                // navigate("/login");
                // history.push("/login");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Layout title={"user profile update "}>
                {/* <ToastContainer /> */}
                <div className="contact_section layout_padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h1 className="contact_taital">Update Profile</h1>
                                <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="contact_section_2">
                            <div className="row">
                                <div className="col-md-12">
                                    <form onSubmit={postData} className="mail_section_1">
                                        <input type="text" className="mail_text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name" name="name" />
                                        <input type="text" className="mail_text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email" name="email" disabled />
                                        <input type="password" className="mail_text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password" name="password" />
                                        <input type="password" className="mail_text" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} placeholder="Confirm Your Password" name="cpassword" />
                                        <input type="text" className="mail_text" value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder="What's Your Favourite Teacher's Name ?" name="answer" />
                                        <button type="submit" class="submit-btn">Update</button>
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

export default UserProfile
