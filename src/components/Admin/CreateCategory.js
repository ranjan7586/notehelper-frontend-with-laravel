import React from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../Admincontrol/AdminMenu'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import DomainForm from '../Form/DomainForm';
import { Modal } from 'antd';

const CreateCategory
    = () => {
        const [visible, setVisible] = useState(false)
        const [selected, setSelected] = useState(null)
        const [updatedName, setUpdatedName] = useState("")
        const [domains, setDomains] = useState([])
        const [name, setName] = useState('')
        //handle Form
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                let domain_name = name;
                const { data } = await axios.post("/api/v1/create-domain", { domain_name })
                if (data?.success) {
                    toast.success(`${name} is Created`);
                    getAllDomains();
                }
                else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        //get all cat
        const getAllDomains = async () => {
            try {
                const { data } = await axios.get("/api/v1/domains");
                if (data?.success) {
                    setDomains(data?.domains);
                }
            } catch (error) {
                toast.error("Something Went Wrong in getting Domains")
            };
        };

        useEffect(() => { getAllDomains() }, [])
        //update Domain
        const handleUpdate = async (e) => {
            e.preventDefault();
            try {
                const { data } = await axios.patch(`/api/v1/update-domain/${selected.id}`, { domain_name: updatedName })
                if (data.success) {
                    toast.success(`${updatedName} is Updated Successfully`)
                    setSelected(null)
                    setUpdatedName("")
                    setVisible(false)
                    getAllDomains()
                }
                else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

        //delete Domain
        const handleDelete = async (deleteid) => {
            try {
                const { data } = await axios.delete(`/api/v1/delete-domain/${deleteid}`)
                if (data.success) {
                    toast.success(`${data.message}`)
                    getAllDomains()
                }
                else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error("Something Went Wrong in Deleting the Domains")
            }
        }
        return (
            <>
                <Layout title={"admin pannel creating domains"}>
                    <div className='contact_section'>
                        <div className="col-sm-12">
                            <h1 className="contact_taital">Create Domains</h1>
                            <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
                        </div>
                        <div className='container-fluid m-3 p-3' >
                            <div className='row'>
                                <div className='col-md-3 mt-4 mb-5'>
                                    <AdminMenu />
                                </div>
                                <div className='col-md-9'><div className='w-65 mt-3 ml-5 p-1'>
                                    <h1>Manage Domains</h1>
                                    <div className='p-3'>
                                        <DomainForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                                    </div>
                                    <div className='w-75'>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Actions</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {domains?.map((c) => (

                                                    <tr key={c.id}>
                                                        <td >{c.domain_name}</td>
                                                        <td><button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(c.domain_name); setSelected(c) }}>Edit</button></td>
                                                        <td><button className='btn btn-danger ms-2' onClick={() => { handleDelete(c.id) }}>Delete</button></td>
                                                    </tr>

                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <h1>Admin Email : {auth?.user?.email}</h1> */}
                                </div>
                                    <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                                        <DomainForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        )
    }

export default CreateCategory

