import React, { useContext, useEffect, useState } from 'react';
import LeftBanner from '../components/banners/leftbanner';
import './profile.css';
import profileIcon from '../components/images/download.png';
import Topbanner from '../components/banners/topbanner';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../components/context/UserContext';

import axios from 'axios';


function Profile() {
  const [bgColor1, setBgColor1] = useState('');
  const [bgColor2, setBgColor2] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState('');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleColorChange1 = (e) => {
    setBgColor1(e.target.value);
  };

  const handleColorChange2 = (e) => {
    setBgColor2(e.target.value);
  };

  const updateUserBioLocalStorage = (updatedUserBio) => {
    localStorage.setItem("userBio", updatedUserBio);
  };


  function showColors() {
    document.getElementById('bgColor1').classList.toggle('show');
    document.getElementById('bgColor2').classList.toggle('show');
  }

  function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  }

  useEffect(() => {
    document.getElementById('navprofile').classList.toggle('activenav');

    axios.get('http://localhost:8800/api/auth/getcolors', {
      params: {
        id: currentUser.id
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
      .then(response => {
        const { bgcolor1, bgcolor2 } = response.data;
        setBgColor1(bgcolor1);
        setBgColor2(bgcolor2);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error scenario
      });

    const storedUserBio = localStorage.getItem("userBio");

    if (storedUserBio) {
      setCurrentUser((prevUser) => ({ ...prevUser, userbio: storedUserBio }));
    }
  }, []);

  const saveUserBio = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8800/api/auth/updatecolors?id=${currentUser.id}`,
        { bgcolor1: bgColor1, bgcolor2: bgColor2 },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setEditMode(false);
      updateUserBioLocalStorage(editedText);
    } catch (error) {
      console.error('Error:', error);
    }
    document.location.reload();
  };
  




  return (
    <div className='App'>
      <LeftBanner />
      <div className='rightsection'>
        <Topbanner />
        <div id='pagecontainer' className='pagecontainer'>
          <div className='profile-headersection' style={{ background: `linear-gradient(${bgColor1}, ${bgColor2})` }}>
            <div id='color-picker' className='color-picker'>
              <button className='edit-button' onClick={() => {
                if (editMode) {
                  saveUserBio();
                }
                setEditMode(!editMode);
                showColors();
              }}>
                {editMode ? 'Save' : <FontAwesomeIcon icon={faEdit} />}
              </button>

              <input
                type='color'
                id='bgColor1'
                name='bgColor1'
                className='bgColor1'
                value={bgColor1}
                onChange={handleColorChange1}
              />
              <input
                type='color'
                id='bgColor2'
                name='bgColor2'
                className='bgColor2'
                value={bgColor2}
                onChange={handleColorChange2}
              />
            </div>

            <div className='profile-picturesection'>
              <img
                style={{ width: '190px', borderRadius: '100%' }}
                src={profileIcon}
                alt='profile'
              ></img>
              <h1 style={{ color: getContrastYIQ(bgColor2) }}>{currentUser.username}</h1>
            </div>
            {editMode ? (
              <div className='profile-infosection'>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  style={{
                    color: getContrastYIQ(bgColor2),
                    backgroundColor: bgColor2,
                    whiteSpace: 'pre-wrap',
                  }}
                ></textarea>
              </div>
            ) : (
              <div className='profile-infosection'>
                <p
                  id='profile-info-paragraph'
                  style={{
                    color: getContrastYIQ(bgColor2),
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                  }}
                >
                  {currentUser.userbio}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className='row-2-section'>
          <div className='profilestatscontainer'>
            <p className='subtitles'>Achievements</p>
            <div className='achievement'>
              <div className='achievement-icon'>
                <h3>🏃</h3>
              </div>
              <div className='achievement-text'>
                <p>Run 5 miles</p>
                <span>Completed on 4/10/2023</span>
              </div>
            </div>
            <div className='achievement'>
              <div className='achievement-icon'>
                <h3>🏋🏽</h3>
              </div>
              <div className='achievement-text'>
                <p>Squat 100kg</p>
                <span>Completed on 4/5/2023</span>
              </div>
            </div>
            <div className='achievement'>
              <div className='achievement-icon'>
                <h3>🤲</h3>
              </div>
              <div className='achievement-text'>
                <p>Do 50 push-ups</p>
                <span>Completed on 3/28/2023</span>
              </div>
            </div>
          </div>
        </div>
        <div className='row-2-section'>
          <div className='profilestatscontainer'>
            <p className='subtitles'>Personal Stats</p>
            <div className='stat'>
              <p>Weight</p>
              <span>80 kg</span>
            </div>
            <div className='stat'>
              <p>BMI</p>
              <span>23.6</span>
            </div>
            <div className='stat'>
              <p>Body Fat</p>
              <span>13%</span>
            </div>
            <div className='stat'>
              <p>Height</p>
              <span>184cm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
