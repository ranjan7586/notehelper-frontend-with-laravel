import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const NoteDetails = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [note, setNote] = useState({})
    const [domain, setDomain] = useState({})
    const [relatednotes, setRelatednotes] = useState([])
    //get notes
    const getNote = async () => {
        try {
            const { data } = await axios.get(`/api/v1/notes/get-a-note/${params.slug}`)
            setNote(data?.note)
            setDomain(data?.note?.domain)
            getSimilarNotes(data?.note._id, data?.note?.domain._id)
            console.log(data)
        } catch (error) {
            console.log(error)

        }
    }
    //initial details
    useEffect(() => {
        if (params?.slug) getNote()
    }, [params?.slug])

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
        toast.success(`Download note with Name: ${noteId.name}`);
    };

    //get similar notes
    const getSimilarNotes = async (pid, did) => {
        try {
            const { data } = await axios.get(`/api/v1/notes/related-notes/${pid}/${did}`)
            setRelatednotes(data?.notes);
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <Layout title={"Note details notehelper"}>
            <div className='contact_section'>
                <div className='row container'>
                    <div className='col-md-6'><div className='note_img_details'>
                        <img className='note-image-details' src={`/api/v1/notes/note-image/${note._id}`} alt={note.name} />
                    </div></div>
                    <div className='col-md-6'>
                        <h1 className='text-center' >Note Details</h1>
                        <div className='note_details'>
                            <h3 className=''>Name : {note.name}</h3>
                            <h4>Domain/Category : {domain.name}</h4>
                            <h5>Author/Source : {note.author}</h5>
                            <h5>Description : {note.description}</h5>
                            {/* <h4>Name : {data.note.domain.name}</h4> */}
                        </div>
                        <div className='read_bt'>
                            <a onClick={() => handleDownload(note)}>Download</a>
                        </div>
                    </div>
                </div>
                <div className='col-md-9'>
                    <div>
                        <h1 className='text-center'>Similar Notes </h1>
                        <div className='p-2 mt-2'>
                            <div className='d-flex flex-wrap'>
                                {relatednotes?.map((p) => (
                                    <div key={p._id} className='col-lg-4 col-md-6 col-sm-12'>
                                        <div className='card p-2 mt-2 note-card'>
                                            {/* <Link to={`/dashboard/admin/note/${p.slug}`}> */}
                                            <div className='note_img'>
                                                <img className='note-image' src={`/api/v1/notes/note-image/${p._id}`} alt={p.name} />
                                            </div>
                                            <h3 className='types_text'>{p.name}</h3>
                                            <p className='looking_text'>{p.domain.name}</p>
                                            <p className='looking_text'>{p.description.substring(0, 30)}</p>
                                            {/* </Link> */}
                                            <div className='read_bt'>
                                                <a onClick={() => handleDownload(p)}>Download</a>
                                            </div>
                                            <div className='read_bt'>
                                                <a onClick={() => navigate(`/note/${p.slug}`)} >Details</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default NoteDetails
