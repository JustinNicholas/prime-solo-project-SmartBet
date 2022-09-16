import React from 'react';
import { useHistory } from 'react-router-dom';

import './InfoPage.css';
import HoverVideoPlayer from 'react-hover-video-player';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {

  const history = useHistory();

const goToGames = () => {
  console.log('clicked');
  history.push('/viewGames');
}

  return (
    <div className="container">
      <h2>Technologies Used</h2>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>React.js</li>
        <li>Redux</li>
        <li>Redux Saga</li>
        <li>Express.js</li>
        <li>Node.js</li>
        <li>PostgreSQL</li>
      </ul>

      <h3>Special shoutout to:</h3>
      <p>My supoort system</p>
      <p>Mitchison Cohort</p>
      {/* <p>Info Page</p> */}
      {/* <div onClick={() => goToGames()} className='nfl-video-play'>
      <div onClick={() => goToGames()} className='video-overlay-text'>VIEW SCHEDULE</div>
      <HoverVideoPlayer onClick={() => goToGames()} videoClassName='nflVideo'
      videoSrc={process.env.PUBLIC_URL + '/NflVideo/footballHighlightVide0.mp4'}
      loop={true}
      onHoverStart={() => {
        console.log('User just moused over or touched hover target.');
        console.log('The video will now attempt to play.');
      }}

      pausedOverlay={
        <img
          className='video-still-img'
          src={process.env.PUBLIC_URL + '/NflVideo/nflVideoStillImage.jpeg'}
          alt=""
          style={{
            // Make the image expand to cover the video's dimensions
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      }
      loadingOverlay={
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      }
    />
      </div>
      <div onClick={() => goToGames()} className='nfl-video-play'>
      <div onClick={() => goToGames()} className='video-overlay-text'>VIEW SCHEDULE</div>
      <HoverVideoPlayer onClick={() => goToGames()} videoClassName='nflVideo'
      videoSrc={process.env.PUBLIC_URL + '/NflVideo/footballHighlightVide0.mp4'}
      loop={true}
      onHoverStart={() => {
        console.log('User just moused over or touched hover target.');
        console.log('The video will now attempt to play.');
      }}

      pausedOverlay={
        <img
          className='video-still-img'
          src={process.env.PUBLIC_URL + '/NflVideo/nflVideoStillImage.jpeg'}
          alt=""
          style={{
            // Make the image expand to cover the video's dimensions
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      }
      loadingOverlay={
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      }
    />
      </div>
      <div onClick={() => goToGames()} className='nfl-video-play'>
      <div onClick={() => goToGames()} className='video-overlay-text'>VIEW SCHEDULE</div>
      <HoverVideoPlayer onClick={() => goToGames()} videoClassName='nflVideo'
      videoSrc={process.env.PUBLIC_URL + '/NflVideo/footballHighlightVide0.mp4'}
      loop={true}
      onHoverStart={() => {
        console.log('User just moused over or touched hover target.');
        console.log('The video will now attempt to play.');
      }}

      pausedOverlay={
        <img
          className='video-still-img'
          src={process.env.PUBLIC_URL + '/NflVideo/nflVideoStillImage.jpeg'}
          alt=""
          style={{
            // Make the image expand to cover the video's dimensions
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      }
      loadingOverlay={
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      }
    />
      </div> */}
    </div>
    
  );
}

export default InfoPage;
