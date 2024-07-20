import { useEffect, useState } from "react";
import Cookies from "js-cookie";

//import react router
import { NavLink, Link, useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});

    const getUserDetails = async (accessToken) => {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`);
        const data = await response.json();
        setUserDetails(data);
    };

        useEffect(() => {
            const accessToken = Cookies.get("access_token");
            if (!accessToken) {
                navigate("/");
            }

            getUserDetails(accessToken);
        }, [navigate]);

    return(
        <div className='sideNavBar'>
            <ul>
                <li className='sideNavBar-profile'><img id='sideNavBar-profilePhoto' src={userDetails.picture} alt="photo" /><p>{userDetails.name}</p></li>
                <li><NavLink to='/dashboard'><img src={home} alt="Home" />Dashboard</NavLink></li>
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