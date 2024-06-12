import React from 'react'
import Layout from '../Layout/Layout'
import UserMenu from './User/UserMenu'
import { useAuth } from '../context/auth'

const Dashboard = () => {
  const [auth]=useAuth()
  return (
      <>
    <Layout title={"user ashboard notehelper"}>
    <>
                <div className='contact_section'>
                <div className="col-sm-12">
                        <h1 className="contact_taital">User Dashboard</h1>
                        <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
                    </div>
                    <div className='container-fluid m-3 p-3' >
                        <div className='row'>
                            <div className='col-md-3 mt-5'>
                                <UserMenu />
                            </div>
                            <div className='col-md-9'><div className='card w-40 mt-5 p-3'>
                                <h1>User Name : {auth?.user?.name}</h1>
                                <h1>User Email : {auth?.user?.email}</h1>
                            </div></div>
                        </div>
                    </div>
                </div>
            </>
    </Layout>
    </>
  )
}

export default Dashboard
