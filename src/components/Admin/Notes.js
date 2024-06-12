import React, { useEffect, useState } from 'react';
import AdminMenu from '../Admincontrol/AdminMenu';
import Layout from '../../Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchInput from '../Form/SearchInput';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [noteUrls, setNoteUrls] = useState({});

  // Lifecycle method
  useEffect(() => {
    getAllNotes();
  }, []);

  useEffect(() => {
    notes.forEach((note) => {
      imageUrl(note.id);
    });
    notes.forEach((note) => {
      handleDownload(note.id);
    });
  }, [notes]);

  // Get all notes
  const getAllNotes = async () => {
    try {
      const { data } = await axios.get('/api/v1/notes');
      setNotes(data.data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const imageUrl = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/note-image/${id}`);
      setImageUrls((prev) => ({ ...prev, [id]: data.url }));
      return "hi";
    } catch (error) {
      console.log(error);
    }
  }

  // Function to handle note download
  const handleDownload = async (note_id) => {
    try {
      const { data } = await axios.get(`/api/v1/get-note/${note_id}`);
      console.log(data);
      setNoteUrls((prev) => ({ ...prev, [note_id]: data.noteurl }));


      // Create a temporary download link
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `${note}.pdf`);
      // document.body.appendChild(link);

      // // Trigger the download
      // link.click();

      // // Clean up the temporary link
      // link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading note:', error);
      toast.error('An error occurred while downloading the note');
    }
    // You can use the noteId to fetch the note and initiate the download
    console.log(`Download note with ID: ${note_id}`);
  };

  return (
    <>
      <Layout title={"admin pannel notes"}>
        <div className='contact_section'>
          <div className='col-sm-12'>
            <h1 className='contact_taital'>All Notes List</h1>
            <div className='bulit_icon'>
              <img src='Assets/images/bulit-icon.png' />
            </div>
          </div>
          <div className='container-fluid p-3'>
            <div className='row'>
              <div className='col-md-3 mt-4 mb-5'>
                <AdminMenu />
              </div>
              <div className='col-md-9'>
                <SearchInput />
                <div className='card w-40 mt-5 p-3'>
                  <h1>User Control</h1>
                  <div className='d-flex flex-wrap'>
                    {notes?.map((p) => (
                      <div key={p.id} className='col-md-3 col-sm-6'>
                        <div className='note-card mt-3 p-2'>
                          <Link to={`/dashboard/admin/note/${p.id}`}>
                            <div className='note_img'>
                              <img className='note-image' src={imageUrls[p.id]} alt={p.name} />
                            </div>
                            <h3 className='types_text'>{p.name}</h3>
                            <p style={{ color: "#1FD780", fontWeight: "bold" }} className='looking_text'>{p.domain_name}</p>
                            <p className='looking_text'>{p.description.substring(0, 20)}</p>
                          </Link>
                          <div className='read_bt'>
                            <a href={noteUrls[p.id]}>Download</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Notes;
