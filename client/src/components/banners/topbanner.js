import React, { useContext } from 'react';
import profileIcon from '../images/download.png'
import { UserContext } from '../context/UserContext.js'
import axios from 'axios';

function Topbanner() {
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
    document.getElementById('pagecontainer').classList.toggle("expand");
  }
  return (
    <div>
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
    </div>
  )
}

export default Topbanner
