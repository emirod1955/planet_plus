//import styles
import './Awards.css'

//imoprt components
import { Medal } from './Medal/Medal';

//import img
import medal1 from '../../assets/img/medals/medal1.webp'
import medal2 from '../../assets/img/medals/medal2.webp'
import medal3 from '../../assets/img/medals/medal3.webp'
import medal4 from '../../assets/img/medals/medal4.webp'
import medal5 from '../../assets/img/medals/medal5.webp'
import medal6 from '../../assets/img/medals/medal6.webp'
import medal7 from '../../assets/img/medals/medal7.webp'
import medal8 from '../../assets/img/medals/medal8.webp'
import medal9 from '../../assets/img/medals/medal9.webp'
import medal10 from '../../assets/img/medals/medal10.webp'
import medal11 from '../../assets/img/medals/medal11.webp'
import medal12 from '../../assets/img/medals/medal12.webp'

const Awards = () =>{
    return(
        <div className="awards">
            <div className='awardsBox'>
                <h2>Green Starter</h2>
                <p>For users who are just beginning their journey towards reducing their carbon footprint.</p>
                <div className="medalBox">
                    <Medal medal={medal1} num={0}/>
                    <Medal medal={medal2} num={8}/>
                </div>
            </div>
            <div className='awardsBox'>
                <h2>Eco Enthusiast</h2>
                <p>For users who have made consistent efforts to incorporate sustainable practices into their daily lives.</p>
                <div className="medalBox">
                    <Medal medal={medal3} num={16}/>
                    <Medal medal={medal4} num={24}/>
                    <Medal medal={medal5} num={32}/>
                    <Medal medal={medal6} num={40}/>
                </div>
            </div>
            <div className='awardsBox'>
                <h2>Sustainability Champion</h2>
                <p>For users who have significantly reduced their carbon footprint through a variety of actions.</p>
                <div className="medalBox">
                    <Medal medal={medal7} num={48}/>
                    <Medal medal={medal8} num={56}/>
                    <Medal medal={medal9} num={64}/>
                </div>
            </div>
            <div className='awardsBox'>
                <h2>Climate Hero</h2>
                <p>For users who are leading by example and inspiring others to take action. These are the pros who have made substantial lifestyle changes.</p>
                <div className="medalBox">
                    <Medal medal={medal10} num={72}/>
                    <Medal medal={medal11} num={80}/>
                    <Medal medal={medal12} num={86}/>
                </div>
            </div>
        </div>
    );
}

export {Awards}