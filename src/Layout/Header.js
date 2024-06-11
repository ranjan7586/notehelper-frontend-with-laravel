import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
const Header = () => {
   // exact = true;
   const [auth, setAuth] = useAuth();
   const handleLogout=()=>{
      setAuth({
         ...auth,user:null,token:""
      })
      localStorage.removeItem('auth');
      toast.success("Logout Successfully");
   }
   const [activeItem, setActiveItem] = useState('');

   const handleItemClick = (item) => {
      setActiveItem(item);
   };

   return (
      <div className="header_section">
         <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
               <Link className="navbar-brand" to='/'>
                  <img src="Assets/images/logo.png" alt="Logo" />
               </Link>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                     <li className="nav-item">
                        <NavLink
                           to="/"
                           className={classnames('nav-link', {
                              active: activeItem === 'home'
                           })}
                           onClick={() => handleItemClick('home')}
                        >
                           Home
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           to="/about"
                           className={classnames('nav-link', {
                              active: activeItem === 'about'
                           })}
                           onClick={() => handleItemClick('about')}
                        >
                           About
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           to="/contact"
                           className={classnames('nav-link', {
                              active: activeItem === 'contact'
                           })}
                           onClick={() => handleItemClick('contact')}
                        >
                           Contact
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           to="/notes"
                           className={classnames('nav-link', {
                              active: activeItem === 'blog'
                           })}
                           onClick={() => handleItemClick('blog')}
                        >
                           Notes
                        </NavLink>
                     </li>
                     {
                        !auth.user ? (<>
                           <li className="nav-item">
                              <NavLink
                                 to="/registration"
                                 className={classnames('nav-link', {
                                    active: activeItem === 'services'
                                 })}
                                 onClick={() => handleItemClick('services')}
                              >
                                 Registration
                              </NavLink>
                           </li>
                           <form className="form-inline my-2 my-lg-0">
                              <div className="login_bt">
                                 <ul>
                                    <li>
                                       <NavLink to="/login">
                                          <span className="user_icon">
                                             <i className="fa fa-user" aria-hidden="true"></i>
                                          </span>
                                          Login
                                       </NavLink>
                                    </li>
                                 
                                 </ul>
                              </div>
                           </form>
                        </>) : (<>

                           <li className="nav-item">
                              <NavLink
                                 to="/"
                                 className={'nav-link'}
                                 onClick={() => handleItemClick('services')}
                              >
                                 {auth?.user?.name}
                              </NavLink>
                           </li>
                           <li className="nav-item">
                              <NavLink
                                 to={`/dashboard/${auth?.user?.role==='admin'?"admin":"user"}`}
                                 className={classnames('nav-link', {
                                    active: activeItem === 'services'
                                 })}
                                 onClick={() => handleItemClick('services')}
                              >
                                 Dashboard
                              </NavLink>
                           </li>

                         <form className="form-inline my-2 my-lg-0">
                           <div className="login_bt">
                              <ul>
                                 <li>
                                    <NavLink onClick={handleLogout} to="/login">
                                       <span className="user_icon">
                                          <i className="fa fa-user" aria-hidden="true"></i>
                                       </span>
                                       Logout
                                    </NavLink>
                                 </li>
                              </ul>
                           </div>
                        </form>
                        </>
                        )}
                  </ul>

               </div>
            </nav>
         </div>
      </div>
   );
};

export default Header;
