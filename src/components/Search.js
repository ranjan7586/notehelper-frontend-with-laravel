import React from 'react'
import Layout from '../Layout/Layout'
import { useSearch } from '../context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Search = () => {
    const navigate=useNavigate()
    const [values, setValues] = useSearch()

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

    return (
        <Layout title={"Search"}>
            <div className='contact_section'>
                <div className='container'>
                    <div className='text-center'>
                        <h1>Search results</h1>
                        <h5>{values?.results.length < 1 ? "Sorry ! No Notes Found" : `Found ${values?.results.length}`}
                        </h5>
                        <div className='d-flex flex-wrap mt-6'>
                            {values?.results.map((p) => (
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
                                            <a onClick={()=>navigate(`/note/${p.slug}`)} >Details</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </Layout>

    )
}

export default Search
