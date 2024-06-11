import Layout from '../Layout/Layout';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const Contact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const noteValues = new FormData();
      noteValues.append("name", name);
      noteValues.append("email", email);
      noteValues.append("phone", phone);
      noteValues.append("message", message);
      const { data } = await axios.post("/api/v1/users/contact", noteValues);
      console.log(data)
      if (data?.success) {
        toast.success(`Thank you ${name}. Your Message was sent successfully`);
        navigate('/contact')
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
  const iframeStyles = {
    border: '0',
    width: '100%'
  };
  return (
    <>
      <Layout title={"Contact us"}>
        <div className="contact_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="contact_taital">Get In Touch</h1>
                <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="contact_section_2">
              <div className="row">
                <div className="col-md-12">
                  <div className="mail_section_1">
                    <input type="text" className="mail_text" placeholder="Your Name" name="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" className="mail_text" placeholder="Your Email" name="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" className="mail_text" placeholder="Your Phone" name="Your Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <textarea className="massage-bt" placeholder="Massage" rows="5" id="comment" name="Massage" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div className="send_bt"><a onClick={handleCreate}>SEND</a></div>
                  </div>
                </div>
                <div className="map_main">
                  <div className="map-responsive">
                    <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&amp;q=Eiffel+Tower+Paris+France" width="250" height="500" frameborder="0" style={iframeStyles} allowfullscreen=""></iframe>
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

export default Contact
