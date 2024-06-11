import React from 'react'
import { Route, Routes } from "react-router-dom";
import Header from './Layout/Header';
import Home from './components/Home';
import Footer from './Layout/Footer';
import About from './components/About';
import Contact from './components/Contact';
import NotesList from './components/NotesList';
import Login from './components/Login';
import Registration from './components/Registration';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './components/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
import CreateCategory from './components/Admin/CreateCategory';
import CreateProduct from './components/Admin/CreateProduct';
import User from './components/Admin/User';
import UserProfile from './components/User/UserProfile';
import Notes from './components/Admin/Notes';
import UpdateProduct from './components/Admin/UpdateProduct';
import Search from './components/Search';
import NoteDetails from './components/NoteDetails';
import Feedback from './Layout/Feedback';
import PrivacyPolicy from './Layout/PrivacyPolicy';
import Disclaimer from './Layout/Disclaimer';
import Address from './Layout/Address';
import UserUploads from './components/User/UserUploads';
import PageNotFound from './Layout/PageNotFound';
import Test from './components/Test';
import ParentTest from './components/ParentTest';
const App = () => {
  const exact = true;
  return (
    <>
      {/* <Header/> */}
      <ToastContainer/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/about' element={<About/>}/>
    
      <Route path='/test' element={<ParentTest/>}/>

      <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
      <Route path='/disclaimer' element={<Disclaimer/>}/>
      <Route path='/address' element={<Address/>}/>
      <Route path='/feedback' element={<Feedback/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/note/:slug' element={<NoteDetails/>}/>
      <Route path='/notes' element={<NotesList/>}/>
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-notes' element={<CreateProduct/>}/>
      <Route path='admin/note/:slug' element={<UpdateProduct/>}/>
      <Route path='admin/notes' element={<Notes/>}/>
      <Route path='admin/monitor-users' element={<User/>}/>
      </Route>
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}/>
      <Route path='user/uploads' element={<UserUploads/>}/>
      <Route path='user/profile' element={<UserProfile/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      </Routes>
      {/* <Footer/> */}
    </>
  )
}

export default App
