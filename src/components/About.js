import React from 'react';
import Layout from '../Layout/Layout';

const About = () => {
    return (
        <Layout title={"About us notehelper"}>
            {/* <!-- about section start --> */}
            <div className="about_section layout_padding">
                <div className="container align-items-center">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <h1 className="about_taital text-center">About Us</h1>
                            <div className="bulit_icon text-center"><img src="Assets/images/bulit-icon.png" alt="Bullet Icon" /></div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="image_iman text-center">
                                <img src="Assets/images/about-img.jpg" className="about_img img-fluid" alt="About Image" />
                            </div>
                        </div>
                        <div className="col-md-6 align-items-center">
                            <div className="about_taital_box">
                                <h1 className="about_taital_1">About Us</h1>
                                <p className="about_text">
                                    Hello from <span style={{ color: "#1FD888", fontWeight: "bold" }}>GROUP B. </span>

                                    We are dedicated MERN Stack devlopers of this project.I am Ranjan Jana,project leader along with Sayan Dutta,Sourav Mondal,Suman Dhara,Nirupan Bhatacharjee have given all their best efforts and knowledge to make this project efficienty.
                                    <br />
                                    Thanks to Our Training Center <span><h4 style={{ color: "#1FD780", fontWeight: "bold" }}>Euphoria Genx</h4></span>
                                    <br />
                                    Special Thanks to Our Training Teacher <span><h4 style={{ color: "#1FD780", fontWeight: "bold" }}>Anup Kumar Paswan</h4></span>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 mt-10">
                            <div className="about_taital_box ">
                                <h1 className="about_taital_1">About Our Project</h1>
                                <p className="about_text">
                                    A  website where anyone can download or upload handwritten or printed study notes regarding any specific domain like Web development,Data structures etc and  free of cost,designed with MERN STACK.
                                    If your desired note not available right there,you can request by submitting a form,and the admin will try to upload the notes after getting the request.
                                    You can also post your questions regarding any topic.
                                    It will be very helpful approach to the students.
                                                            <br/>
                                    <span style={{ color: "#1FD780", fontStyle: "Italic",fontWeight:"bold" }}>This is the First Introduction of our project, we will try to implement more features when we will work on the project and will try to make it useful.</span>

                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 mt-10">
                            <div className="about_taital_box  mt-4">
                                <h1 className="about_taital_1">About Our Goal</h1>
                                <p className="about_text">
                                Our Goal is to create a user-friendly platform, "NoteHelper," where students can download and upload study notes on various domains like Web Development, Data Structures, etc., free of cost. Enable users to request specific notes and foster a supportive community for questions and discussions. Ensure a seamless and secure user experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- about section end --> */}
        </Layout>
    );
};

export default About;
