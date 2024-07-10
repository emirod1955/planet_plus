//import react router
import { Link } from 'react-router-dom'

//import styles
import './TopNavBarHome.css'

//import img
import instagram from './assets/instagram.svg'
import twitter from './assets/twitter.svg'

const TopNavBarHome = () =>{
    return(
        <nav className='topNavHome'>
                <p>PLANET +</p>
                <div className='topNavHome-social'>
                    <Link to="https://www.instagram.com/" target='_blank'><img src={instagram} alt="instagram"/></Link>
                    <Link to="https://x.com/" target='_blank'><img src={twitter} alt="twitter" /></Link>
                </div>
        </nav>
    );
}

export {TopNavBarHome}