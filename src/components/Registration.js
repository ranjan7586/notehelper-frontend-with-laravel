import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Layout from '../Layout/Layout';
const Registration = () => {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", password: "", cpassword: "", answer: ""
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }
  const postData = async (e) => {
    e.preventDefault();
    if(user.password!=user.cpassword){
      alert("Passwords should be same");
      return;
    }
    setLoading(true)

    const { name, email, password, cpassword, answer } = user;

    const res = await fetch("/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password,
      })
    });
    const data = await res.json();
    const dataStatus = await res.status;
    console.log(data);
    console.log(data.message);
    console.log(dataStatus);

    if (dataStatus === 422 || !data) {
      setLoading(false)
      toast.error(data.message, {
        autoClose: 2000, onClose: () => {
          navigate("/login");
        }
      });
      // window.alert(data.message)
      console.log(data.message);
    }
    else if (dataStatus === 421 || !data) {
      toast.error(data.message);
      console.log(data.message)
      setLoading(false)
    }
    else {
      await toast.success(data.message);
      console.log("Registration Suucessful")
      navigate("/login");
      setLoading(false)
    }
  }
  console.log(process.env.REACT_APP_API);
  console.log("lol ranjan");
  return (
    <>
      <Layout title={"Registration/notehelper"}>
        {/* <ToastContainer /> */}
        <div className="contact_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="contact_taital">Registration</h1>
                <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="contact_section_2">
              <div className="row">
                <div className="col-md-12">
                  <form onSubmit={postData} className="mail_section_1">
                    <input required type="text" className="mail_text" value={user.name} onChange={handleInputs} placeholder="Enter Your Name" name="name" />
                    <input required type="text" className="mail_text" value={user.email} onChange={handleInputs} placeholder="Enter Your Email" name="email" />
                    <input required type="password" className="mail_text" value={user.password} onChange={handleInputs} placeholder="Enter Your Password" name="password" />
                    <input required type="password" className="mail_text" value={user.cpassword} onChange={handleInputs} placeholder="Confirm Your Password" name="cpassword" />
                    <input required type="text" className="mail_text" value={user.answer} onChange={handleInputs} placeholder="What's Your Favourite Teacher's Name ?" name="answer" />
                    <input required type="checkbox" name="" id="" class="check-box" /><span className='span2'>I agree to the terms & conditions</span>
                    <button type="submit" class="submit-btn">{loading ? 'Registering...' : 'Register'}
                    </button>
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

export default Registration
