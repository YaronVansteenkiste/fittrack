import React from 'react';

import './App.css';
import LineChart from './components/charts/linechart.js'
import BarChart from './components/charts/barchart';
import CircleDiagram from './components/charts/circlechart';
import LeftBanner from './components/banners/leftbanner';


function App() {

  return (
    <div className="App">
      <LeftBanner/>
      <div className='rightsection'>
        <div className='topbanner'>
          <div className='profilecontainer'>
            <h3>Big uwu</h3>
          </div>
        </div>
        <div className='dashboard'>
          <h1 className='greeting'>Hello User!</h1>
          <div className='journeystat'>
            <p className='subtitles'>Your Journey</p>
            <div className='chart-container'>
              <LineChart/>
            </div>
          </div>
          <div className='fitness-charts'>
            <div className='fitnessection'>
              <div className='fitnesscontainer'>
                <p className='subtitles'>Fitness</p>
                <BarChart/>
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

export default App;
