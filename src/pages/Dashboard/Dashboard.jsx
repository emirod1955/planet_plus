//import react
import { useEffect, useState } from "react";

//import components
import {HomeTask} from './Task/Task'

//import img
import stage from './assets/stage.png'

import medal from './assets/medal.png'
import check from '../../assets/img/check.svg'
import clock from './assets/clock.svg'

import clean from './assets/buttons/clean.svg'
import fish from './assets/buttons/fish.svg'
import chimney from './assets/buttons/chimney.svg'

//import styles
import './Dashboard.css'

const Dashboard = () =>{

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
                                    <h1>Hurrah!</h1>
                                    <p>You are almost there</p>
                                </div>
                                <img src={medal} alt="medal" />
                            </div>
                            <div className='progressSide-bottom'>
                                <div className='progressSide-bottomText'>
                                    <img src={check} alt="check" />
                                    <p>20 Tasks completed</p>
                                </div>
                                <div className='progressBar'>
                                    <div className='progressBar-progress'></div>
                                </div>
                            </div>
                        </div>
                        <div className='taskSide'>
                            <div className='taskSide-top'>
                                <h2>Your tasks for the week</h2>
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
                    <div className='homeSubMenu-bottom'>
                        <div className='bottomButtons-box'>
                            <button type="button"><p>Clean</p><img src={clean} alt="clean" /></button>
                            <button type="button"><p>Fish</p><img src={fish} alt="fish" /></button>
                            <button type="button"><p>Stove</p><img src={chimney} alt="chimney" /></button>
                        </div>
                    </div>
                </aside>
            </div>
    );
}

export {Dashboard}