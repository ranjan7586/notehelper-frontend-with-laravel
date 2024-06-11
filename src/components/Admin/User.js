import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../Admincontrol/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const User = () => {

    const [users, setUsers] = useState([]);
    const [userid, setUserId] = useState('');
    const [role, setRole] = useState('');
    const [auth, setAuth] = useAuth();
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/v1/users")
            console.log(data)
            if (data?.success) {
                setUsers(data.data)
            }
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        console.log(auth);
        getUsers();
        if (role != "")
            handleUpdateRole();
    }, [role, userid]);

    const handleRole = (user) => {
        console.log(user.id);
        setUserId(user.id);
        setRole((prevRole) => (user.role === "user" ? "admin" : "user"));
    };

    const handleUpdateRole = async () => {
        console.log(userid, role);
        try {
            const { data } = await axios.patch(
                `api/v1/update-role/${userid}`,
                { role: role },
                { new: true }
            );
            if (data?.success) {
                toast.success("User role updated successfully");
                getUsers();
            } else {
                toast.error("User role updation unsuccessful");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Layout title={"admin pannel all users observation"}>
                <div className='contact_section'>
                    <div className="col-sm-12">
                        <h1 className="contact_taital">User Monitor Pannel</h1>
                        <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
                    </div>
                    <div className='container-fluid m-3 p-3'>
                        <div className='row'>
                            <div className='col-md-3 mt-4 mb-5'>
                                <AdminMenu />
                            </div>
                            <div className='col-md-9'><div className='card w-40 mt-5 p-3'>
                                <h1>User Control</h1>
                                <div className='w-75'>
                                    <div className='table-responsive'>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Role</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {users?.map((c) => (
                                                    <tr key={c.id}>
                                                        <td>{c.name}</td>
                                                        <td>{c.email}</td>
                                                        <td>{c.role}</td>
                                                        <td>
                                                            {(c.role === "user") ? (
                                                                <button disabled={auth?.user?.id === c.id} className='btn btn-danger ms-2' onClick={() => { handleRole(c) }}>Make Admin</button>
                                                            ) : (

                                                                <button disabled={auth?.user?.id === c.id} className='btn btn-danger ms-2' onClick={() => { handleRole(c) }}>Make User</button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
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

export default User
