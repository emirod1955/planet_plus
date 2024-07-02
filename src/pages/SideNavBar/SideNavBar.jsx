//import react router
import { NavLink, Link } from 'react-router-dom';

//import img
import home from './assets/home.svg'
import foot from './assets/foot.svg'
import trophy from './assets/trophy.svg'
import ranking from './assets/ranking.svg'

import instagram from './assets/instagram.svg'
import twitter from './assets/twitter.svg'

//import styles
import './SideNavBar.css'

const SideNavBar = () =>{
    return(
        <div className='sideNavBar'>
            <ul>
                <li className='sideNavBar-profile'><span>LS</span><p>Liam Smith</p></li>
                <li><NavLink to='/'><img src={home} alt="Home" />Home</NavLink></li>
                <li><NavLink to='/your-footprint'><img src={foot} alt="Your footprint" />Your footprint</NavLink></li>
                <li><NavLink to='/badges'><img src={trophy} alt="Badges" />Badges</NavLink></li>
                <li><NavLink to='/hall-of-fame'><img src={ranking} alt="Hall of fame" />Hall of fame</NavLink></li>
            </ul>
            <div className='sideNavBar-social'>
                <Link to='https://www.instagram.com/' target='_blank'><img src={instagram} alt="instagram" /></Link>
                <Link to='https://x.com/' target='_blank'><img src={twitter} alt="twitter" /></Link>
            </div>
        </div>
    );
}

export {SideNavBar}