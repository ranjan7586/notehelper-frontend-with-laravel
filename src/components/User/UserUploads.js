import UserMenu from './UserMenu'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Layout from '../../Layout/Layout';
import AdminMenu from '../Admincontrol/AdminMenu';
import Select from 'react-select';

const UserUploads = () => {
    const navigate = useNavigate();
    const [domain, setDomain] = useState('');
    const [image, setImage] = useState('');
    const [thenote, setTheNote] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // Add a loading state
    const [description, setDescription] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const noteValues = new FormData();
            noteValues.append("name", name);
            noteValues.append("domain", domain);
            noteValues.append("author", author);
            noteValues.append("email", email);
            noteValues.append("description", description);
            noteValues.append("image", image);
            noteValues.append("thenote", thenote);
            const { data } = await axios.post("/api/v1/notes/users/create-note", noteValues);
            console.log(data)
            if (data?.success) {
                toast.success(`${name} is Created`);
                navigate('/dashboard')
                // getAllDomains();
            }
            else if (data?.status == 501) {
                console.log(data.message);
                toast.error(data.message)
            }
            else {
                toast.error("error")
            }

        } catch (error) {
            console.log(error.response.data.message)

            toast.error(error.response.data.message);
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <>
            <Layout title={"user uploads notes notehelper"}>
                <div className='contact_section'>
                    <div className="col-sm-12">
                        <h1 className="contact_taital">Your Uploads</h1>
                        <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
                    </div>
                    <div className='container-fluid m-3 p-3' >
                        <div className='row'>
                            <div className='col-md-3 mt-4 mb-5'>
                                <UserMenu />
                            </div>
                            <div className='col-md-9'><div className='card w-40 mt-5 p-3'>
                                <div className='w-75 text-center mx-auto'>
                                    <h1>Create Note</h1>
                                    <div className='m-1 p-3'>
                                    <div className='mb-3'>
                                            <h5>Please note that after uploading your note,the admins will verify the content of the note.If the content is found appropriate to publish,then your note will be published.Thank You. </h5>
                                        </div>
                                        <div className='mb-3 mt-5'>
                                            <label className='btn btn-outline-primary col-md-12'>
                                                {image ? image.name : "Upload Image"}
                                                <input type='file' name='name' accept='image/*' onChange={(e) => setImage(e.target.files[0])} hidden />
                                            </label>
                                        </div>
                                        <div className='m-4'>
                                            {image && (
                                                <div className='text-center'>
                                                    <h2>Preview</h2>
                                                    <img src={URL.createObjectURL(image)} alt='Note Image' style={{ maxHeight: '200px', maxWidth: '200px' }} // Set maximum height and width
                                                        className='img img-responsive' />
                                                </div>
                                            )}
                                        </div>
                                        <div className='mb-3 mt-5'>
                                            <label className='btn btn-outline-primary col-md-12'>
                                                {thenote ? thenote.name : "Upload Note"}
                                                <input type='file' name='thenote' accept='.pdf' onChange={(e) => setTheNote(e.target.files[0])} hidden />
                                            </label>
                                        </div>
                                        <div className='m-4'>
                                            {thenote && (
                                                <div className='text-center'>
                                                    <h2>Note Preview</h2>
                                                    <a href={URL.createObjectURL(thenote)} target='_blank' rel='noopener noreferrer'>View Note</a>
                                                </div>
                                            )}
                                        </div>
                                        <div className='mb-3'>
                                            <input type='text' value={name} placeholder='Enter the name' className='form-control border border-primary' onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type='text' value={email} placeholder='Enter your email address' className='form-control border border-primary' onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type='text' value={domain} placeholder='Enter note domain/category(eg. CSE,B.PHARM' className='form-control border border-primary' onChange={(e) => setDomain(e.target.value)} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type='text' value={author} placeholder='Enter author/source name'  className='form-control border border-primary' onChange={(e) => setAuthor(e.target.value)} />
                                        </div>
                                        <div className='mb-3'>
                                            <textarea type='textarea' value={description} placeholder='Give little description' className='form-control border border-primary' onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                        <div className='mb-4 mt-4 text-center'>
                                            <button className='btn btn-primary' onClick={handleCreate}>{loading?"Creating ...":"Create Note"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div></div>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}

export default UserUploads
