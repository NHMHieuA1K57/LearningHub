import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <p className="footer-heading">Learning Hub</p>
            <p className="footer-subheading">Stay connected - Contact us:</p>
            <div className="footer-contact">
              <span className="footer-icon">📞</span>
              <span className="footer-contact-info">xxx-xxxx-xxx</span>
            </div>
            <div className="footer-contact">
              <span className="footer-icon">✉️</span>
              <span className="footer-contact-info">123@gmail.com</span>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="footer-right">
              <p className="footer-heading">About us</p>
              <p className="footer-subheading">Term of services</p>
              <div className="footer-circle">
                <span className="footer-circle-text">C</span>
              </div>
              <p className="footer-right-text">2023 Learning hub</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
