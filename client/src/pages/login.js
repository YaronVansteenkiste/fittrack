import React, { useContext, useRef, useEffect, useState } from 'react';
import examplePicture from '../components/images/loginpic.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import anime from 'animejs';
import { useNavigate } from "react-router-dom";
import {UserContext} from '../components/context/UserContext.js'
import {ReactComponent  as Logo} from '../components/images/logo.svg'
import './login.css';

function Login() {
  const snakeRef = useRef(null);
  const [inputs, setInputs] = useState ({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({... prev, [e.target.name]: e.target.value}));
  }

  const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    setTimeout(async () => {
      e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      if (err.response) {
        setErr(err.response.data);
      } else {
        setErr("An error occurred.");
        console.log(err);
      }
    }
    }, 1000);
  };

  useEffect(() => {
    let current = null;
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    const submitButton = document.querySelector('#submit');


    passwordInput.addEventListener('keyup', (e) => {
      if(e.key === 'Enter') {
        submitButton.focus()
        submitButton.click()
      }
    })

    const animateSnake = (offset, arrayValue) => {
      if (current) current.pause();
      current = anime({
        targets: '.snake path',
        strokeDashoffset: {
          value: offset,
          duration: 1000,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: arrayValue,
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    };

    usernameInput.addEventListener('focus', (e) => {
      animateSnake(0, '240 1386');
    });

    passwordInput.addEventListener('focus', (e) => {
      animateSnake(-336, '240 1386');
    });

    submitButton.addEventListener('focus', (e) => {
      animateSnake(-730, '530 1386');
    });

    const snake = anime({
      targets: snakeRef.current,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000
    });

  }, []);


  return (
    <div className='credpage'>
      <div className='header'>
        <h1>Welcome to GymTrack!</h1>
      </div>
      <div className='credcontainer'>
        <div className='picturecontainer'>
          <Logo></Logo>
        </div>
        <div className='formcontainer'>
          <div className='credscontainer'>
            <Form>
              <svg viewBox='0 0 320 300' className='snake'>
                <defs>
                  <linearGradient
                    id='linearGradient'
                    x1='13'
                    y1='193.49992'
                    x2='307'
                    y2='193.49992'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop style={{ stopColor: '#ff00ff' }} offset='0' />
                    <stop style={{ stopColor: '#ff0000' }} offset='1' />
                  </linearGradient>
                </defs>
                <path
                  ref={snakeRef}
                  d='m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143'
                  style={{
                    fill: 'none',
                    stroke: 'url(#linearGradient)',
                    strokeWidth: '3',
                    strokeDasharray: '1000',
                    strokeDashoffset: '1000',
                  }}
                />
                <rect
                  className='highlight'
                  x='0'
                  y='185'
                  width='80'
                  height='5'
                />
              </svg>
              <Form.Group  className='mb-3' controlId="username">
                <Form.Label>Username: {err && err}</Form.Label>
                <Form.Control className='credinput' type="text" placeholder="Enter username" name="username" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control className='credinput' type="password" placeholder="Password" name='password' onChange={handleChange}/>
              </Form.Group>
            </Form>
            <div className='formactioncontainer'>
              <Button className='credbutton' variant="primary" type="submit" id="submit" onClick={handleLogin}>
                Login
              </Button>
              <a style={{margin: '10px'}} href='/register'>Don't have an account?</a>
              <a style={{margin: '10px'}} href='#'>Forgot password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login;
