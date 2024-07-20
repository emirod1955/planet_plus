//import react
import { useState } from 'react';

//import react router
import { NavLink, Link } from 'react-router-dom'

//import styles
import './TopNavBar.css';

//import img
import menu from './assets/menu-burger.svg'
import twitter from './assets/twitter.svg'
import instagram from './assets/instagram.svg'

const TopNavBar = () =>{
    const [isNavExpanded,  setIsNavExpanded] = useState(false);

    return(
        <nav className='topNavBar'>
            <div className='topNav'>
                <p>PLANET +</p>
                <img src={menu} onClick={() => {setIsNavExpanded(!isNavExpanded);}} alt="menu"/>
            </div>
            <aside className={isNavExpanded ? "navItems active" : "navItems"}>
                <ul>
                    <li><NavLink to="/dashboard" onClick={() => {setIsNavExpanded(!isNavExpanded);}}>DASHBOARD</NavLink></li>
                    <li><NavLink to="/your-footprint" onClick={() => {setIsNavExpanded(!isNavExpanded);}}>YOUR FOOTPRINT</NavLink></li>
                    <li><NavLink to="/badges" onClick={() => {setIsNavExpanded(!isNavExpanded);}}>BADGES</NavLink></li>
                    <li><NavLink to="/hall-of-fame" onClick={() => {setIsNavExpanded(!isNavExpanded);}}>HALL OF FAME</NavLink></li>
                    <li><NavLink to="account" onClick={() => {setIsNavExpanded(!isNavExpanded);}}>ACCOUNT</NavLink></li>
                </ul>
                <div className='topNav-networks'>
                    <Link to="https://www.instagram.com/" target='_blank'><img src={instagram} alt="instagram"/></Link>
                    <Link to="https://x.com/" target='_blank'><img src={twitter} alt="twitter" /></Link>
                </div>
            </aside>
        </nav>
    );
}

export {TopNavBar}
