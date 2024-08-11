//import react
import { useContext, useState } from 'react'

//import react router
import { Link } from 'react-router-dom'

//import components
import {HomeTask} from './Task/Task'

//import context
import { ResponseContext } from '../../context'

//import img
import stage from './assets/stage.png'

import check from '../../assets/img/check.svg'
import clock from './assets/clock.svg'

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
import medal13 from '../../assets/img/medals/medal13.webp'

//import styles
import './Dashboard.css'

const Dashboard = () =>{
    const { actualCount, trueCount, userDetails } = useContext(ResponseContext)

    const getImageSrc = (count) => {
        if (count < 0) return medal1;
        else if (count < 8) return medal2;
        else if (count < 16) return medal3;
        else if (count < 24) return medal4;
        else if (count < 32) return medal5;
        else if (count < 40) return medal6;
        else if (count < 48) return medal7;
        else if (count < 56) return medal8;
        else if (count < 64) return medal9;
        else if (count < 72) return medal10;
        else if (count < 80) return medal11;
        else if (count < 86) return medal12;
        return medal13;
    }

    const imageSrc = getImageSrc(trueCount);

    const getWidth = (count) => {
        if (count === 1) return '12.5%';
        else if (count === 2) return '25%';
        else if (count === 3) return '37.5%';
        else if (count === 4) return '50%';
        else if (count === 5) return '62.5%';
        else if (count === 6) return '75%';
        else if (count === 7) return '87.5%';
        return '0%';
    };

    const dinamicStyle = {
        width: getWidth(actualCount),
    };

    useState(()=>{
        console.log(actualCount)
    }, [actualCount])

    return(
            <div className='home'>
                <section className='stageBox'>
                    <img src={stage} alt="" />
                </section>
                <aside className='homeSubMenu'>
                    <div className='homeSubMenu-top'>
                    <div className='progressSide'>
                            <div className='progressSide-top'>
                                <div className='progressSide-topText'>
                                    <h1>Hi {userDetails.given_name}!</h1>
                                    <p>Go for your next achievement!</p>
                                </div>
                                <Link to={'/awards'}><img src={imageSrc} alt="medal" /></Link>
                            </div>
                            <div className='progressSide-bottom'>
                                <div className='progressSide-bottomText'>
                                    <img src={check} alt="check" />
                                    <p>{trueCount} Tasks completed</p>
                                </div>
                                <div className='progressBar'>
                                    <div style={dinamicStyle} className='progressBar-progress'></div>
                                </div>
                            </div>
                        </div>
                        <div className='taskSide'>
                            <div className='taskSide-top'>
                                <h2>Your tasks for today</h2>
                                <img src={clock} alt="clock" />
                            </div>
                            <div className='taskSide-bottom'>
                                <HomeTask unique={0}/>
                                <HomeTask unique={1}/>
                                <HomeTask unique={2}/>
                                <HomeTask unique={3}/>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
    );
}

export {Dashboard}