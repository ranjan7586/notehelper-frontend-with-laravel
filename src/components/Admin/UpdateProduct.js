import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from '../../Layout/Layout';
import AdminMenu from '../Admincontrol/AdminMenu';
import Select from 'react-select';
// import Option from 'react-select/dist/declarations/src/components/Option';
const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [domains, setDomains] = useState([]);
    const [domain, setDomain] = useState(null);
    const [image, setImage] = useState('');
    const [thenote, setTheNote] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState("")
    const [confirmed, setConfirmed] = useState(false);
    //get single note
    const getSingleNote = async () => {
        try {
            console.log("first,",params)
            const { data } = await axios.get(`/api/v1/get-note-details/${params.slug}`)
            console.log(data)
            setName(data.note.name)
            setId(data.note.id)
            setAuthor(data.note.author)
            setDescription(data.note.description)
            setDomain(data.note.domain_id)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect((
    ) => {
        getSingleNote();
        //eslint-disable-next-line
    },
        [])

    // Get all domains
    const getAllDomains = async () => {
        try {
            const { data } = await axios.get('/api/v1/domains');
            if (data?.success) {
                console.log(data);
                setDomains(data?.domains);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong in getting Domains');
        }
    };

    useEffect(() => {   
        getAllDomains();
    }, []);
    useEffect(() => {
        console.log(domains);
    }, [domains]);

    // // Handle domain selection
    // const handleDomainSelect = (selectedOption) => {
    //     setDomain(selectedOption);
    //     console.log(selectedOption.value);
    // };
    // Get the domain object for the selected domain ID
    const selectedDomain = domains.find((d) => d.id === domain);
    console.log(domains)
    // // Transform domains data for react-select
    const selectOptions = domains.map((c) => ({
        value: c.id,
        label: c.domain_name,
    }));
    //create note
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const noteValues = new FormData();
            noteValues.append("name", name);
            noteValues.append("domain", domain);
            noteValues.append("author", author);
            noteValues.append("description", description);
            image && noteValues.append("image", image);
            noteValues.append("thenote", thenote);
            const { data } = await axios.put(`/api/v1/notes/${id}`, noteValues);
            console.log(data)
            if (data?.success) {
                toast.success(`${name} is Updated Successfully`);
                navigate('/dashboard/admin/notes')
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
        finally {
            setLoading(false);

        }
    }

    const handlePreviewNote = async (noteId) => {
        try {
            const response = await axios.get(`/api/v1/notes/note/${noteId}`, {
                responseType: 'blob',
            });

            // Create a new Blob object from the response data
            const file = new Blob([response.data], { type: 'application/pdf' });

            // Create a temporary URL for the Blob object
            const url = URL.createObjectURL(file);

            // Open the URL in a new tab to preview the note
            window.open(url, '_blank');

        } catch (error) {
            console.log(error);
        }
    };

    //delete prompt

    const handleDeletePrompt = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                setConfirmed(true); // User confirmed the action
            } else {
                setConfirmed(false); // User canceled the action
            }
        });
    };

    //delete a note
    const handleDelete = async () => {
        try {
            // Show the delete prompt and wait for the user's choice
            const prompt = await handleDeletePrompt();

            if (confirmed) {
                const { data } = await axios.delete(`/api/v1/notes/${id}`);
                toast.success(data.message);
                navigate('/dashboard/admin/notes');
            } else {
                // User canceled the delete action
                // You can add any desired handling here, e.g., show a message or do nothing
                console.log('Deletion canceled by the user.');
                return
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    return (
        <>
            <Layout title={"updating note admin pannel"}>
                <div className='contact_section'>
                    <div className='col-sm-12'>
                        <h1 className='contact_taital'>Update Notes</h1>
                        <div className='bulit_icon'>
                            <img src='Assets/images/bulit-icon.png' alt='Bulit Icon' />
                        </div>
                    </div>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-3 mt-4 mb-5'>
                                <AdminMenu />
                            </div>
                            <div className='col-md-9'>
                                <div className='w-75 text-center mx-auto'>
                                    <h1>Update Note</h1>
                                    <div className='m-1 p-3'>
                                        <div>
                                            <Select
                                                options={selectOptions}
                                                placeholder='Select a Domain'
                                                isSearchable
                                                // onChange={handleDomainSelect}
                                                onChange={(selectedOption) => {
                                                    setDomain(selectedOption.value);
                                                }}
                                                value={selectedDomain ? { value: selectedDomain._id, label: selectedDomain.name } : null}
                                            // Set the selected domain from the state here
                                            />
                                        </div>
                                        <div className='mb-3 mt-5'>
                                            <label className='btn btn-outline-primary col-md-12'>
                                                {image ? image.name : "Upload Image"}
                                                <input type='file' name='name' accept='image/*' onChange={(e) => setImage(e.target.files[0])} hidden />
                                            </label>
                                        </div>
                                        <div className='m-4'>
                                            {image ? (
                                                <div className='text-center'>
                                                    <h2>Preview</h2>
                                                    <img src={URL.createObjectURL(image)} alt='Note Image' style={{ maxHeight: '200px', maxWidth: '200px' }} // Set maximum height and width
                                                        className='img img-responsive' />
                                                </div>
                                            ) : (
                                                <div className='text-center'>
                                                    <h2>Preview</h2>
                                                    <img src={`/api/v1/notes/note-image/${id}`} alt='Note Image' style={{ maxHeight: '200px', maxWidth: '200px' }} // Set maximum height and width
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
                                            {thenote ? (
                                                <div className='text-center'>
                                                    <h2>Note Preview</h2>
                                                    <a href={URL.createObjectURL(thenote)} target='_blank' rel='noopener noreferrer'>View Note</a>
                                                </div>
                                            ) : (
                                                <div className='text-center'>
                                                    <h2>Note Preview</h2>
                                                    <a onClick={() => handlePreviewNote(id)} target='_blank' rel='noopener noreferrer'>View Note</a>
                                                </div>
                                            )}
                                        </div>
                                        <div className='mb-3'>
                                            <input type='text' value={name} placeholder='Enter the name' className='form-control border border-primary' onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className='mb-3'>
                                            <textarea type='textarea' value={author} placeholder='Enter author/source name' className='form-control border border-primary' onChange={(e) => setAuthor(e.target.value)} />
                                        </div>
                                        <div className='mb-3'>
                                            <textarea type='textarea' value={description} placeholder='Give little description' className='form-control border border-primary' onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                        <div className='mb-4 mt-4 text-center'>
                                            <button className='btn btn-primary' onClick={handleUpdate}>                {loading ? 'Updating...' : 'Update Note'}
                                            </button>
                                        </div>
                                        <div className='mb-4 mt-4 text-center'>
                                            <button className='btn btn-danger' onClick={handleDelete}>Delete Note</button>
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

export default UpdateProduct
