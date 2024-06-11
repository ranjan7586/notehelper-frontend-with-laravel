import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';
import { useAuth } from '../context/auth';
const NoteList = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();
    const [checked, setChecked] = useState([]);
    const [domains, setDomains] = useState([]);
    const [notes, setNotes] = useState([]);
    const [filternotes, setFilterNotes] = useState(0);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get('/api/v1/notes/note-count')
            setTotal(data?.total)
        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    //load more
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/notes/note-list/${page}`);
            setLoading(false)
            setNotes([...notes, ...data?.notes])
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page])

    //get all notes
    const getAllNotes = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/notes/note-list/${page}`);
            setLoading(false)
            setNotes(data.notes);
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error.message);
        }
    };

    // Lifecycle method
    useEffect(() => {
        if (!checked.length) getAllNotes();
    }, [checked.length]);
    console.log(checked.length)

    useEffect(() => {
        if (checked.length) filterNotes();
    }, [checked]);

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
        getTotal();
    }, []);

    //handle download
    const handleDownload = async (noteId) => {
        // Implement the download logic here
        try {
            const response = await axios.get(`/api/v1/notes/note/${noteId._id}`, {
                responseType: 'blob',
            });

            // Create a temporary download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${noteId.name}.pdf`);
            document.body.appendChild(link);

            // Trigger the download
            link.click();

            // Clean up the temporary link
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading note:', error);
            toast.error('An error occurred while downloading the note');
        }
        // You can use the noteId to fetch the note and initiate the download
        console.log(`Download note with ID: ${noteId}`);
    };

    //filter by domain
    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id);
            setFilterNotes(1);
            console.log("on")
        } else {
            all = all.filter((c) => c !== id)
            console.log("off")
            setFilterNotes(0);
            setPage(1)
        }
        setChecked(all);
    }
    console.log(checked)
    console.log(checked.length)

    //get filter product by domain
    const filterNotes = async () => {
        try {
            const { data } = await axios.post(`/api/v1/notes/note-filters`, { checked })
            setNotes(data?.notes)
        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }
    return (
        <Layout title={"Note list notehelper"}>
            <>
                <div className='contact_section p-3'>
                    <div className="col-sm-12 ">
                        <h1 className="contact_taital">Notes</h1>
                        <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
                    </div>
                    <div className='row rownotes'>
                        <div className='col-md-3'>
                            <div className='sticky-top'>
                                <h4 className='text-center'>Filter By Domain</h4>
                                <div className='card p-4 mb-3'>
                                    <div className='d-flex flex-column text-center'>
                                        {domains?.map((c) => (
                                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                                {c.name}
                                            </Checkbox>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-md-9'>
                            <h1 className='text-center'>All Notes</h1>
                            <div className=' p-1 mt-2'>
                                <div className='d-flex flex-wrap'>
                                    {notes?.map((p) => (
                                        <div key={p._id} className='col-lg-4 col-md-6 col-sm-12'>
                                            <div className='card p-3 mt-2 note-card'>
                                                {/* <Link to={`/dashboard/admin/note/${p.slug}`}> */}
                                                <div className='note_img'>
                                                    <img className='note-image' src={`/api/v1/notes/note-image/${p._id}`} alt={p.name} />
                                                </div>
                                                <h3 className='types_text'>{p.name}</h3>
                                                <p className='looking_text'>{p.domain.name}</p>
                                                <p className='looking_text'>{p.description.substring(0, 30)}</p>
                                                {!auth.user ? (
                                                    <div className='read_bt'>
                                                        <a onClick={() => navigate("/login")}>Log in to Download</a>
                                                    </div>
                                                ) : (
                                                    <div className='read_bt'>
                                                        <a onClick={() => handleDownload(p)}>Download</a>
                                                    </div>
                                                )}

                                                <div className='read_bt'>
                                                    <a onClick={() => navigate(`/note/${p.slug}`)} >Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='m-2 p-3 text-center'>
                                {notes && checked.length < 1 && notes.length < total && (
                                    <button className='btn btn-warning' onClick={(e) => {
                                        e.preventDefault()
                                        setPage(page + 1);
                                    }}>
                                        {loading ? "Loading ..." : "Load more"}
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </Layout>
    );
};

export default NoteList;
