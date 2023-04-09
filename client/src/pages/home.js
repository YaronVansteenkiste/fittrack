import React, { useContext } from 'react';
import './home.css';
import LineChart from '../components/charts/linechart'
import BarChart from '../components/charts/barchart';
import CircleDiagram from '../components/charts/circlechart';
import LeftBanner from '../components/banners/leftbanner';
import profileIcon from '../components/images/profilepic.png'
import { UserContext } from '../components/context/UserContext.js'
import axios from 'axios';

function Home() {

  const { setCurrentUser } = useContext(UserContext);
  const { currentUser } = useContext(UserContext);


  const logout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout", {
      withCredentials: true,
    });
    localStorage.clear();
    setCurrentUser(null);
  }

  function dropDownClick() {
    document.getElementById('myDropdown').classList.toggle("show");
    document.getElementById('dashboard').classList.toggle("expand");
  }

  return (
    <div className="App">
      <LeftBanner />
      <div className='rightsection'>
        {currentUser ? (
          <div className='topbanner'>
            <div className='profilecontainer' onClick={dropDownClick}>
              <img className='profileicon' src={profileIcon} />
              <h3>{currentUser.username}</h3>
            </div><div id='myDropdown' className='dropdown-content'>
              <a href='/settings'>User Settings</a>
              <a href='/'>Support</a>
              <a href="/" onClick={logout}>Logout</a>
            </div>
          </div>
        ) : (
          <div className='topbanner'>
            <div className='profilecontainer' onClick={dropDownClick}>
              <h3>Login/Register</h3>
            </div><div id='myDropdown' className='dropdown-content'>
              <a href='/login'>Login</a>
              <a href='/register'>Register</a>
            </div>
          </div>
        )}
        <div id='dashboard' className='dashboard'>
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
          <div className='fitness-charts'>
            <div className='fitnessection'>
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
