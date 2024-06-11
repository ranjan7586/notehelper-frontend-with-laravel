import React from 'react';
import { Link } from 'react-router-dom';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <>
      {/* // <!-- footer section start --> */}
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to='/feedback'>
                <h3 className="address_text">Feedback</h3>
              </Link>
              <Link to='/disclaimer'>
                <h3 className="address_text">Disclaimer</h3>
              </Link>
              <Link to='/privacy-policy'>
                <h3 className="address_text">Privacy Policy</h3>
              </Link>
              <Link to='/address'>
                <h3 className="address_text">Address</h3>
              </Link>
              <p className="footer_text">
                here, content here', making it look like readable English. Many desktop publishing packages and web page
                editors now use
              </p>
              <div className="location_text">
                <ul>
                  {/* <li>
                  <a href="#">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <span className="padding_left_10">+917586905449</span>
                  </a>
                </li> */}
                  <li>
                    <a href="#">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                      <span className="padding_left_10">ranjanjana012@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="form-group mb-5">
                <textarea className="update_mail" placeholder="Your Email" rows="5" id="comment" name="Your Email"></textarea>
                <div className="subscribe_bt">
                  <a href="#">
                    <img src="Assets/images/teligram-icon.png" alt="Telegram Icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- footer section end --> */}
      <Copyright />
    </>
  );
};

export default Footer;
