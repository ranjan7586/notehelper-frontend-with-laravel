import React from 'react'
import Layout from './Layout'

const Disclaimer = () => {
    return (
        <>
            <Layout title={"disclaimer notehelper"}>
                <div className="about_section layout_padding">
                    <div className="container align-items-center">
                        <div className="row align-items-center">
                            <div className="col-md-12">
                                <h1 className="about_taital text-center">Disclaimer</h1>
                                <div className="bulit_icon text-center"><img src="Assets/images/bulit-icon.png" alt="Bullet Icon" /></div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="image_iman text-center">
                                    <img src="https://www.seekpng.com/png/small/42-428290_apple-cider-vinegar-weight-loss-disclaimer-disclaimer-stamp.png" className="about_img img-fluid" alt="Disclaimer Image" />
                                </div>
                            </div>
                            <div className="col-md-6 align-items-center">
                                <div className="about_taital_box_disclaimer">
                                    <h1 className="about_taital_1">Disclaimer</h1>
                                    <p className="about_text">
                                        We are doing our best to prepare the content of this site. However,Notehelper cannot warranty the expressions and suggestions of the contents, as well as its accuracy. In addition, to the extent permitted by the law, Cyber Tech and Tips shall not be responsible for any losses and/or damages due to the usage of the information on our website.

                                        By using our website, you hereby consent to our disclaimer and agree to its terms.

                                        The links contained on our website may lead to external sites, which are provided for convenience only. Any information or statements that appeared in these sites are not sponsored, endorsed, or otherwise approved by Cyber Tech and Tips. For these external sites, Notehelper cannot be held liable for the availability of, or the content located on or through it. Plus, any losses or damages occurred from using these contents or the internet generally.
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

export default Disclaimer
