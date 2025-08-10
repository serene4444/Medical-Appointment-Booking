import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <section className="hero-section" style={{backgroundColor: 'rgba(0,0,0,0.1)', padding: '50px', minHeight: '100vh'}}>
      <div>
        <div data-aos="fade-up" className="flex-hero">
          <h1 style={{color: 'white', fontSize: '48px', textAlign: 'center', marginBottom: '20px'}}>
            Your Health<br/>
            <span className="text-gradient">
              Our Responsibility
            </span>
          </h1>
          <div className="blob-cont">
            <div className="blue blob"></div>
          </div>
          <div className="blob-cont">
            <div className="blue1 blob"></div>
          </div>
          <h4 style={{color: 'white', textAlign: 'center', fontSize: '18px', marginBottom: '30px'}}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at quae ducimus. Suscipit omnis quibusdam non cum rem voluptatem!
          </h4>
          <a href="#services">
            <button className="button" style={{backgroundColor: '#2190FF', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '25px', cursor: 'pointer'}}>Get Started</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
