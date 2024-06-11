import React, { useState } from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SearchInput = () => {
  const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const [values,setValues]=useSearch()
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
          setLoading(true)
            const {data}=await axios.get(`/api/v1/notes/search-note/${values.keyword}`)
            setValues({...values,results:data})
            navigate('/search');
        } catch (error) {
            console.log(error)
            
        }finally{
          setLoading(false)
        }
    }
  return (
    <>

      <form className='d-flex search-div' role='search' onSubmit={handleSubmit}>
        <input
        className='form-control me-2'
        type='search'
        placeholder='Search Here ...'
        aria-label='Search'
        value={values.keyword}
        onChange={(e)=>{setValues({...values,keyword:e.target.value})}}
        />
        <button className='btn btn-outline-success btn-search' type='submit'>
            {loading?"Searching ...":"Search"}
        </button>
      </form>
    </>
  )
}

export default SearchInput
