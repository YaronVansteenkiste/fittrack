import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import LeftBanner from '../components/banners/leftbanner';
import './profile.css';
import profileIcon from '../components/images/download.png';
import Topbanner from '../components/banners/topbanner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


function Profile() {
  const [bgColor1, setBgColor1] = useState('#25d5bd');
  const [bgColor2, setBgColor2] = useState('#9198e5');
  const [profileInfo, setProfileInfo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState('');

  const handleColorChange1 = (e) => {
    setBgColor1(e.target.value);
  };

  const handleColorChange2 = (e) => {
    setBgColor2(e.target.value);
  };

  function showColors() {
    document.getElementById('bgColor1').classList.toggle('show')
    document.getElementById('bgColor2').classList.toggle('show')
  }

  function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  }


  function handleProfileInfoChange(e) {
    setProfileInfo(e.target.value);
  }

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  const save = () => {
    const paragraph = document.getElementById('profile-info-paragraph');
    paragraph.innerText = editedText;
    setEditedText('');
  };


  useEffect(() => {
    document.getElementById('navprofile').classList.toggle('activenav')
  })
  return (
    <div className='App'>
      <LeftBanner />
      <div className='rightsection'>
        <Topbanner />
        <div id='pagecontainer' className='pagecontainer'>
          <div className='profile-headersection' style={{ background: `linear-gradient(${bgColor1}, ${bgColor2})` }}>
            <div id='color-picker' className='color-picker'>
              <button className='edit-button' onClick={() => {
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
              ></img>
              <h1 style={{ color: getContrastYIQ(bgColor2) }}>Username</h1>
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
                    overflowWrap: 'break-word'
                  }}
                >
                  {editedText}
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

export default Profile
