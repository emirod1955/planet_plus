//import react
import { useContext } from 'react'

//import components
import {HomeTask} from './Task/Task'

//import context
import { ResponseContext } from '../../context'

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
    const { actualCount, trueCount } = useContext(ResponseContext)

    const getStyle = () => {
        if (actualCount == 0) {
            return { width: '0%' };
        } else if (actualCount == 1){
            return { width: '25%' };
        } else if (actualCount == 2){
            return { width: '50%' };
        } else if (actualCount == 3){
            return { width: '75%' };
        } else if (actualCount == 4){
            return { width: '100%' };
        }
    };

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
                                    <p>{trueCount} Tasks completed</p>
                                </div>
                                <div className='progressBar'>
                                    <div style={getStyle()} className='progressBar-progress'></div>
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