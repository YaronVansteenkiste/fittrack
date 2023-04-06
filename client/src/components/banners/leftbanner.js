import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faUser, faDumbbell, faUtensils, faCog } from '@fortawesome/free-solid-svg-icons';
import './leftbanner.css'
import Nav from 'react-bootstrap/Nav';



function LeftBanner() {
    return (
        <div className='leftbanner'>
            <div className='logosection'>
                Logo
            </div>
            <div className='navlink'>
                <Nav.Link eventKey="link-1"><FontAwesomeIcon icon={faChartLine} className='icon' /></Nav.Link>
            </div>
            <div className='navlink'>
                <Nav.Link eventKey="link-1"><FontAwesomeIcon icon={faUser} className='icon' /></Nav.Link>

            </div>
            <div className='navlink'>
                <Nav.Link eventKey="link-1"><FontAwesomeIcon icon={faDumbbell} className='icon' /></Nav.Link>

            </div>
            <div className='navlink'>
                <Nav.Link eventKey="link-1"><FontAwesomeIcon icon={faUtensils} className='icon' /></Nav.Link>

            </div>
            <div className='navlink'>
                <Nav.Link eventKey="link-1"><FontAwesomeIcon icon={faCog} className='icon' /></Nav.Link>

            </div>
        </div>

    )
}
export default LeftBanner