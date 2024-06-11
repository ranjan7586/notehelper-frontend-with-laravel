import Layout from './Layout'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const Feedback = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
        const noteValues = new FormData();
        noteValues.append("name", name);
        noteValues.append("email", email);
        noteValues.append("message", message);
        const { data } = await axios.post("/api/v1/users/feedback", noteValues);
        console.log(data)
        if (data?.success) {
            toast.success(`Thank you ${name}. Your feedback was sent successfully`);
            navigate('/feedback')
            // getAllDomains();
        }
        else if (data?.status == 401) {
            console.log(data.message);
            toast.error(data.message)
        }
        else {
            toast.error("error")
        }

    } catch (error) {
        console.log(error.response.data.message)

        toast.error(error.response.data.message);
    }
}
  return (
    <>
    <Layout title={"feedback help us to improve"}>
    <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="contact_taital">Feedback</h1>
              <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="contact_section_2">
            <div className="row">
              <div className="col-md-12">
                <div  className="mail_section_1">
                  <input required type="text" className="mail_text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" name="name" />
                  <input required type="text" className="mail_text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" name="email" />
                  <input type='textarea' placeholder='Write Your Feedback Please ...' name='message' className='form-control border border-primary' value={message} onChange={(e) => setMessage(e.target.value)} />
                  <button onClick={handleCreate} type="submit" class="submit-btn">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
      
    </>
  )
}

export default Feedback
