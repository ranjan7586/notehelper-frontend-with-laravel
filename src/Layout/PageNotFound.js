import React from 'react'
import Layout from './Layout'

const PageNotFound = () => {
    return (
        <>
            <Layout title={"page not found 404 notehelper"}>
                <div className="about_section layout_padding">
                    <div className="container align-items-center">
                        <div className="row align-items-center">
                            <div className="col-md-12">
                                <h1 className="about_taital text-center">PageNotFound</h1>
                                <div className="bulit_icon text-center"><img src="Assets/images/bulit-icon.png" alt="Bullet Icon" /></div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="image_iman text-center">
                                    <img src="https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg" className="about_img img-fluid" alt="Page NOt FOUND Image" />
                                </div>
                            </div>
                            <div className="col-md-6 align-items-center">
                                <div className="about_taital_box_disclaimer">
                                    <h1 className="about_taital_1">404 BAD REQUEST</h1>
                                    <p className="about_text">
                                        <h1>sorry</h1>
                                        <h1> ERROR 404</h1>
                                        <h1>Page Not Found</h1>
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

export default PageNotFound
