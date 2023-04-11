import React, { useContext, useEffect } from 'react';
import './home.css';
import LineChart from '../components/charts/linechart'
import BarChart from '../components/charts/barchart';
import CircleDiagram from '../components/charts/circlechart';
import LeftBanner from '../components/banners/leftbanner';
import profileIcon from '../components/images/download.png'
import { UserContext } from '../components/context/UserContext.js'
import axios from 'axios';
import Topbanner from '../components/banners/topbanner';

function Home() {
  const { setCurrentUser } = useContext(UserContext);
  const { currentUser } = useContext(UserContext);
  
useEffect(() => {
  document.getElementById('navhome').classList.toggle('activenav')
})

  return (
    <div className="App">
      <LeftBanner />
      <div className='rightsection'>
        <Topbanner></Topbanner>
        <div id='pagecontainer' className='pagecontainer'>
          {currentUser ? (
            <h1 className='greeting'>Hello {currentUser.username}!</h1>
          ) : (
            <h1 className='greeting'>Hello User!</h1>
          )}
          <div className='journeystat'>
            <p className='subtitles'>Your Journey</p>
            <div className='chart-container'>
              <LineChart />
            </div>
          </div>
          <div className='row-2-container'>
            <div className='row-2-section'>
              <div className='fitnesscontainer'>
                <p className='subtitles'>Fitness</p>
                <BarChart />
              </div>
              <div className='dietcontainer'>
                <p className='subtitles'>Diet</p>
                <CircleDiagram></CircleDiagram>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
