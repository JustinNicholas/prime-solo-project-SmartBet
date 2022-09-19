import React from 'react';
import './InfoPage.css';

function InfoPage() {

  return (
    <div className="info-page-container">
      <div className='about-container'>
        <h1 className='info-page-titles'>ABOUT SMARTBET</h1>
        <img className='playbook-image greyscale-image' src={process.env.PUBLIC_URL + '/PlaybookImage/playbook.svg'} />
        <div className='about-text'>
          <p>Ever wonder how much money you've won or lost overtime through gambling? Smartbet is a web application that allows users to keep track of their personal NFL betting history. The ability to analyze and draw insights from personal betting statistics in SMARTBET enables users to make higher performing bets overtime.</p>
          <p>The application also serves as a log to provide visibility into personal gambling history. With Smartbet, users are empowered to regulate their bets and protect against unhealthy gambling habits.</p>
          <p>Smartbet was created and developed by Prime Digital Academy Student, Justin Nicholas, to showcase the skills and knowledge he acquired through his coursework.</p>
        </div>
      </div>
      <div className='tech-used-conatiner'>
        <h1 className='info-page-titles'>TECHNOLOGIES USED</h1>
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
          <p className='thank-you-text'>Special thanks to my supoort system at home and the Prime Academy Mitchison Cohort</p>
        </div>
        <div className='connect-container'>
          <h1 className='info-page-titles'>LETS CONNECT!</h1>
          <p className='linkedin-text'>Scan the QR Code below to visit my LinkedIn Page or go to <a className='linkedin-link' href="https://www.linkedin.com/in/justin-nicholas-p/">https://www.linkedin.com/in/ justin-nicholas-p/</a></p>
          <img className='linkedin-image' src={process.env.PUBLIC_URL + '/LinkedInImage/linkedInQRCode.svg'} />
        </div>
      </div>

    </div>
    
  );
}

export default InfoPage;
