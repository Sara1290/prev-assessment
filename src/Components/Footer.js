import React from 'react';
import prev from '../images/prev.png';

const Footer = () => {


  return (
    <div className="footer-outer">
      <img alt="previdence logo" src={prev} className="logo" />
      <div className="vert-line"></div>
      <h2>Previdence 2021</h2>
    </div>
  )
}
export default Footer;