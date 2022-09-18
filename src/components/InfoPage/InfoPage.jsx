import React from 'react';
import './InfoPage.css';

function InfoPage() {

  return (
    <div className="info-page-container">
      <div className='tech-used-conatiner'>
        <h1 className='info-page-titles'>Technologies Used</h1>
        <div className='bubble-container'>
          <div className='tech-used-bubbles'>HTML</div>
          <div className='tech-used-bubbles'>CSS</div>
          <div className='tech-used-bubbles'>JavaScript</div>
          <div className='tech-used-bubbles'>React.js</div>
          <div className='tech-used-bubbles'>Redux</div>
          <div className='tech-used-bubbles'>Redux Saga</div>
          <div className='tech-used-bubbles'>Express.js</div>
          <div className='tech-used-bubbles'>Node.js</div>
          <div className='tech-used-bubbles'>PostgreSQL</div>
          <div className='tech-used-bubbles'>3rd Party API</div>
        </div>
      </div>
      <div className='thank-you-container'>
        <h1 className='info-page-titles'>THANK YOU</h1>
        <div className='bubble-container'>
          <p className='thank-you-text'>Special thanks to my supoort system at hom an the Prime Academy Mitchison Cohort</p>
        </div>
      </div>

    </div>
    
  );
}

export default InfoPage;
