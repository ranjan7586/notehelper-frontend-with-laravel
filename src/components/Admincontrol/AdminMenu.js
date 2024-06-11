import React from 'react'
import Layout from '../../Layout/Layout'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
                <div className='contact_section'>
                    <div className="list-group">

                        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Domain</NavLink>
                        <NavLink to="/dashboard/admin/create-notes" className="list-group-item list-group-item-action">Create Notes</NavLink>
                        <NavLink to="/dashboard/admin/notes" className="list-group-item list-group-item-action">All Notes</NavLink>
                        <NavLink to="/dashboard/admin/monitor-users" className="list-group-item list-group-item-action">Users</NavLink>

                    </div>


                </div>

        </>

    )
}

export default AdminMenu
