import React, { useEffect, useState } from 'react';
import AdminMenu from '../Admincontrol/AdminMenu';
import Layout from '../../Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchInput from '../Form/SearchInput';

const Notes = () => {
  const [notes, setNotes] = useState([]);

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
    console.log(id)
    try {
      const { data } = await axios.get(`/api/v1/note-image/${id}`);
      console.log(data);
      return data.data.url;
    } catch (error) {

    }
  }
  // Lifecycle method
  useEffect(() => {
    getAllNotes();
  }, []);

  // Function to handle note download
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
                              <img className='note-image' src={imageUrl(p.id)} alt={p.name} />
                            </div>
                            <h3 className='types_text'>{p.name}</h3>
                            <p style={{ color: "#1FD780", fontWeight: "bold" }} className='looking_text'>{p.domain_name}</p>
                            <p className='looking_text'>{p.description.substring(0, 20)}</p>
                          </Link>
                          <div className='read_bt'>
                            <a onClick={() => handleDownload(p)}>Download</a>
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
