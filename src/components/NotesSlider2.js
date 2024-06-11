import React, { useEffect, useState } from 'react'
import SearchInput from './Form/SearchInput';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
const NotesSlider2 = () => {
    const navigate = useNavigate()
    const [notes, setNotes] = useState([]);
    const [relatednotes, setRelatednotes] = useState([])
    //get all notes
    const getAllNotes = async () => {
        try {
            const { data } = await axios.get(`/api/v1/notes`);
            setNotes(data?.notes);
            console.log(data)
            getSimilarNotes(data?.notes[2]?._id, data?.notes[2]?.domain._id)
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    useEffect(() => {
        getAllNotes();
    }, []);

     //get similar notes
     const getSimilarNotes = async (pid, did) => {
        try {
            const { data } = await axios.get(`/api/v1/notes/related-notes/${pid}/${did}`)
            setRelatednotes(data?.notes);
        } catch (error) {
            console.log(error)

        }
    }
    //download
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

    return (
        <>
            <div className="coffee_section layout_padding">
                <div className="container">
                    <div className="row">
                        <h1 className="coffee_taital">LATEST FROM {notes[2]?.domain?.name}</h1>
                        <div className="bulit_icon"><img src="Assets/images/bulit-icon.png" /></div>
                    </div>
                </div>
                <div className="coffee_section_2">
                    <div id="main_slider1" className="carousel slide" data-ride="carousel" data-pause="false">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container-fluid">
                                    <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[8]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[8]?.name}</h3>
                                            <p className="looking_text">{relatednotes[8]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[8])}>Download</a></div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[9]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[9]?.name}</h3>
                                            <p className="looking_text">{relatednotes[9]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[9])}>Download</a></div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[10]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[10]?.name}</h3>
                                            <p className="looking_text">{relatednotes[10]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[10])}>Download</a></div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[11]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[11]?.name}</h3>
                                            <p className="looking_text">{relatednotes[11]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[11])}>Download</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[0]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[0]?.name}</h3>
                                            <p className="looking_text">{relatednotes[0]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[0])}>Download</a></div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[1]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[1]?.name}</h3>
                                            <p className="looking_text">{relatednotes[1]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[1])}>Download</a></div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[2]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[2]?.name}</h3>
                                            <p className="looking_text">{relatednotes[2]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[2])}>Download</a></div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[3]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[3]?.name}</h3>
                                            <p className="looking_text">{relatednotes[3]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[3])}>Download</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="container-fluid">
                                    <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[5]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[5]?.name}</h3>
                                            <p className="looking_text">{relatednotes[5]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[5])}>Download</a></div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[6]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[6]?.name}</h3>
                                            <p className="looking_text">{relatednotes[6]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[6])}>Download</a></div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[4]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[4]?.name}</h3>
                                            <p className="looking_text">{relatednotes[4]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[4])}>Download</a></div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="coffee_img"><img src={`/api/v1/notes/note-image/${relatednotes[7]?._id}`} /></div>
                                            <h3 className="types_text">{relatednotes[7]?.name}</h3>
                                            <p className="looking_text">{relatednotes[7]?.domain?.name}</p>
                                            <div className="read_bt"><a onClick={() => handleDownload(relatednotes[7])}>Download</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#main_slider1" role="button" data-slide="prev">
                            <i className="fa fa-arrow-left"></i>
                        </a>
                        <a className="carousel-control-next" href="#main_slider1" role="button" data-slide="next">
                            <i className="fa fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>

        </>

    )
}

export default NotesSlider2
