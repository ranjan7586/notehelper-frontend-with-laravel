import React, { useEffect, useState } from 'react'
import SearchInput from './Form/SearchInput';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
const Slider = () => {
    const navigate = useNavigate()
    const [notes, setNotes] = useState([]);
    //get all notes
    const getAllNotes = async () => {
        try {
            const { data } = await axios.get(`/api/v1/notes`);
            setNotes(data?.notes);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    useEffect(() => {
        getAllNotes();
    }, [])
    // const img_id=notes[0]._id

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
    return (
        <>
            {/* <!-- banner section start --> */}
            <div className='contact_section'>
                <div className='text-center'>
                    <div className='div_searchinput'>
                        <SearchInput />
                    </div>
                </div>
                <div className="banner_section layout_padding">
                    <div className="container">
                        <div id="banner_slider" className="carousel slide" data-ride="carousel" data-pause="false">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="banner_img"><img className='home_img_slider' src={`/api/v1/notes/note-image/${notes[0]?._id}`} /></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="banner_taital_main pt-0">
                                                <h1 className="banner_taital">{notes[0]?.name}</h1>
                                                <h5 className="tasty_text">{notes[0]?.domain?.name}</h5>
                                                <p className="banner_text">{notes[0]?.description.substring(0, 70)} </p>
                                                <div className="btn_main">
                                                <div className='about_bt'>
                                                        <a onClick={() => handleDownload(notes[0])}>Download</a>
                                                    </div>
                                                    <div className='callnow_bt active'>
                                                        <a onClick={() => navigate(`/note/${notes[0]?.slug}`)} >Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item pt-0">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="banner_img"><img className='home_img_slider' src={`/api/v1/notes/note-image/${notes[1]?._id}`} /></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="banner_taital_main pt-0">
                                                <h1 className="banner_taital">{notes[1]?.name}</h1>
                                                <h5 className="tasty_text">{notes[1]?.domain?.name}</h5>
                                                <p className="banner_text">{notes[1]?.description.substring(0, 70)} </p>
                                                <div className="btn_main">
                                                    <div className='about_bt'>
                                                        <a onClick={() => handleDownload(notes[1])}>Download</a>
                                                    </div>
                                                    <div className='callnow_bt active'>
                                                        <a onClick={() => navigate(`/note/${notes[1]?.slug}`)} >Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="banner_img"><img className='home_img_slider' src={`/api/v1/notes/note-image/${notes[2]?._id}`} /></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="banner_taital_main pt-0">
                                                <h1 className="banner_taital">{notes[2]?.name}</h1>
                                                <h5 className="tasty_text">{notes[2]?.domain?.name}</h5>
                                                <p className="banner_text">{notes[2]?.description.substring(0, 70)} </p>
                                                <div className="btn_main">
                                                    <div className='about_bt'>
                                                        <a onClick={() => handleDownload(notes[2])}>Download</a>
                                                    </div>
                                                    <div className='callnow_bt active'>
                                                        <a onClick={() => navigate(`/note/${notes[2]?.slug}`)} >Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <a className="carousel-control-prev" href="#banner_slider" role="button" data-slide="prev">
                                    <i className="fa fa-arrow-left" />
                                </a>
                                <a className="carousel-control-next" href="#banner_slider" role="button" data-slide="next">
                                    <i className="fa fa-arrow-right" />
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- banner section end --> */}
        </>
    )
}

export default Slider
