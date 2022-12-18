import React from 'react';

// import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import {FaBars, FaTimes} from 'react-icons/fa'
import '../styles/NavbarStyle.css'

const Navbar = (props) => {
    // const[click, setClick] = useState(false)
    // const handleClick = () => setClick(!click)

    return (
        <>
            <nav className="header">
                <Link to="/" className="navbar-logo" onClick={props.refresh}>
                    <h2>finalcheck</h2>
                    {/* <img src={logo} alt="Home" />*/}
                </Link>
                {/* <div className="navbar-container">
                    <ul className={click ? 'nav-menu active' :'nav-menu'} onClick={handleClick}>
                        <li>
                            <Link to ="/list">My List</Link>
                        </li>
                    </ul>
                    <div className='hamburger' onClick={handleClick}>
                        {click ? (<FaTimes size={20} style={{color: '#fff'}} />) : (<FaBars size={20} style={{color: '#fff'}} />)}
                    </div>
                </div> */}

            </nav>
        </>
    )
}

export default Navbar;

