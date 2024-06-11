import React from 'react'
import Layout from './Layout'

const Address = () => {
  return (
    <>
      <Layout title={"address notehelper"}>
            <div className="about_section layout_padding">
                <div className="container align-items-center">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <h1 className="about_taital text-center">Address</h1>
                            <div className="bulit_icon text-center"><img src="Assets/images/bulit-icon.png" alt="Bullet Icon" /></div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="image_iman text-center">
                                <img src="https://www.collegebatch.com/static/clg-gallery/brainware-university-kolkata-216368.jpg" className="about_img img-fluid" alt="About Image" />
                            </div>
                        </div>
                        <div className="col-md-6 align-items-center">
                            <div className="about_taital_box">
                                <h1 className="about_taital_1">Our Address</h1>
                                <p className="about_text">
                                    BRAINWARE UNIVERSITY,BARASAT,CHAPADALI MORE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )
}

export default Address
