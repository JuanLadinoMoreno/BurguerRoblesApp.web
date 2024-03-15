import React from 'react'
import vgVideo from '../../../assets/video/burgueroblesVLC (online-video-cutter.com) SINAUDIO.mp4'
// import imgLogo from '../assets/img/logoSl.png'

export default function Header() {
  return (
   
    <header className="header ">
        <div className="bgBlack"></div>
        <video className="" src={vgVideo} type="video/mp4" autoPlay loop muted></video>
        <div className="header-content">
            <h1>
                <i className="fas fa-hamburger"></i>
                Burguer Robles
                <i className="fas fa-hamburger"></i>
            </h1>
            <img className="img-center" src='../../public/img/logoSl.png' alt="" data-aos="flip-left" data-aos-easing="linear"
                data-aos-duration="2500"/>
            <a className="btn-transparent" href="pages/about.html">Ver Mas</a>
        </div>
    </header>

  );
}
