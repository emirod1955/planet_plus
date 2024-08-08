//import react router
import { Link } from 'react-router-dom'

//import styles
import './TopNavBarHome.css'

const TopNavBarHome = () =>{
    return(
        <nav className='topNavHome'>
                <Link to="/"><p>PLANET +</p></Link>
        </nav>
    );
}

export {TopNavBarHome}