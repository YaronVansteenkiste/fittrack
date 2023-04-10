import React, { useContext, useRef, useEffect, useState } from 'react';
import examplePicture from '../components/images/loginpic.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import anime from 'animejs';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../components/context/UserContext.js';
import axios from 'axios'
import {ReactComponent  as Logo} from '../components/images/logo.svg'
import './login.css';

function Register() {
    const snakeRef = useRef(null);
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [err, setErr] = useState(null);

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const navigate = useNavigate()

    const handleRegister = async e => {
            e.preventDefault()

            try {
                await axios.post("http://localhost:8800/api/auth/register", inputs)
                navigate("/");
            } catch (err) {
                setErr(err);
            }
    }

    useEffect(() => {
        let current = null;
        const usernameInput = document.querySelector('#username');
        const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#password');
        const submitButton = document.querySelector('#submit');

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

        emailInput.addEventListener('focus', (e) => {
            animateSnake(-350, '240 1386');
        });

        passwordInput.addEventListener('focus', (e) => {
            animateSnake(-690, '240 1386');
        });

        submitButton.addEventListener('focus', (e) => {
            animateSnake(-1130, '790 1386');
        });

        const snake = anime({
            targets: snakeRef.current,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 2000
        });

    }, []);

    console.log(err);

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
                            <svg viewBox='0 -40 320 500' className='snake'>
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
                                    d='M 293 119 H 40.109 C 0 121 0 188 40.884 187.95 l 239.9998 -0.0003 c 1.2822 0.1903 24.9926 0.7993 25.0002 35.0002 c 0.008 34.2008 -25.0002 35 -25.0002 35 h -239.9998 c 0 -0.0205 -25 4.0135 -25 40 c 0 34.4865 25 38.5 25 38.5 h 215 c 0 0 20 -0.996 20 -25 c 0 -24.004 -20 -25 -20 -25 h -190 c 0 0 -20 1.7103 -20 25 c 0 24.004 20 25 20 25 h 168.5714'
                                    style={{
                                        fill: 'none',
                                        stroke: 'url(#linearGradient)',
                                        strokeWidth: '3',
                                        strokeDasharray: '2000',
                                        strokeDashoffset: '0',
                                    }}
                                />
                                <rect
                                    className='highlight'
                                    x='20'
                                    y='185'
                                    width='200'
                                    height='100'
                                />
                            </svg>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username: {err && err}</Form.Label>
                                <Form.Control className='credinput' type="text" placeholder="Enter Username" name='username' onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email: </Form.Label>
                                <Form.Control className='credinput' type="text" placeholder="Enter email" name='email' onChange={handleChange} />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="password"
                            >
                                <Form.Label>Password: </Form.Label>
                                <Form.Control className='credinput' type="password" name='password' placeholder="Enter Password" onChange={handleChange} />
                            </Form.Group>
                            <div className='formactioncontainer'>
                                <Button className='credbutton' variant="primary" type="submit" id="submit" onClick={handleRegister}>
                                    Register
                                </Button>
                                <a href='/login'>Already have an account? Login</a>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
