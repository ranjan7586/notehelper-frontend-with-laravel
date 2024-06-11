import React from 'react'
import Layout from '../../Layout/Layout'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
                <div className='contact_section'>
             
                    <div className="list-group">

                        <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
                        <NavLink to="/dashboard/user/uploads" className="list-group-item list-group-item-action">Uploads</NavLink>
                        

                    </div>


                </div>
            
        </>
  )
}

export default UserMenu
