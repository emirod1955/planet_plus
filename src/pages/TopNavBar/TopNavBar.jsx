//import react
import { useState } from 'react';

//import react router
import { NavLink } from 'react-router-dom'

//import styles
import './TopNavBar.css';

//import img
import menu from './assets/menu-burger.svg'
import gemini from './assets/gemini.webp'

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
                    <li><NavLink to="/awards" onClick={() => {setIsNavExpanded(!isNavExpanded);}}>AWARDS</NavLink></li>
                    <li><NavLink to="/hall-of-fame" onClick={() => {setIsNavExpanded(!isNavExpanded);}}>HALL OF FAME</NavLink></li>
                </ul>
                <div className='poweredGemini-topNav'>
                    <p>powered by</p>
                    <img src={gemini} alt="gemini" />
                </div>
            </aside>
        </nav>
    );
}

export {TopNavBar}
