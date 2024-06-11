import React from 'react'
import Layout from './Layout'

const PrivacyPolicy = () => {
    return (
        <Layout title={"privacy policy notehelper"}>
            <div className="about_section layout_padding">
                <div className="container align-items-center">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <h1 className="about_taital text-center">Privacy Policy</h1>
                            <div className="bulit_icon text-center"><img src="Assets/images/bulit-icon.png" alt="Bullet Icon" /></div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="image_iman text-center">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVSP4t3FLskh2ay3nYWNG1WAOlM-EpM_EJ00-jrspg0fdfa5BABGbf9zqAJEyLa_5-hec&usqp=CAU.jpg" className="about_img img-fluid" alt="Privacy Policy Image" />
                            </div>
                        </div>
                        <div className="col-md-6 align-items-center">
                            <div className="about_taital_box_pp">
                                <h1 className="about_taital_1">Privacy Policy</h1>
                                <p className="about_text">
                                   
                                    At NoteHelper, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines the types of data we collect and how we use and safeguard it. By using our website, you consent to this policy.
                                    <br/>
                                    1. Information Collection: We may collect your name, email, and other relevant data when you interact with our website.
                                    <br/>
                                    2. Data Usage: We use your information to improve our services, personalize content, and communicate with you.
                                    <br/>
                                    3. Data Protection: We employ security measures to protect your data, but no method is 100% secure. Use our services at your own risk.
                                    <br/>
                                    4. Third-Party Sharing: We may share data with trusted third-party partners to enhance our website's functionality.
                                    <br/>
                                    5. Cookies: We use cookies for site analytics and a better user experience. You can manage preferences in your browser settings.
                                    <br/>
                                    6. Children's Privacy: Our website is not intended for children under 13. We do not knowingly collect data from them.
                                    <br/>
                                    7. Changes: We may update this policy. Check back for the latest version.
                                    <br/>
                                    8. Contact: For any privacy concerns, contact us at [Your contact email].
                                    <br/>
                                    By using NoteHelper, you agree to this Privacy Policy. If you disagree, please refrain from using our services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PrivacyPolicy
