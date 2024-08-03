//import react
import { useState, useContext } from 'react';

//import styles
import './Task.css';

//import components
import { Modal } from '../../../components/Modal/Modal';

//import state
import { ResponseContext } from '../../../context';

//import images
import Check from './assets/check.png';

const HomeTask = ({unique}) =>{
    const [modal, setModal] = useState(false)
    const { response, tasks } = useContext(ResponseContext)

    return (
        <div className="task">
            <p style={{textDecoration : response[unique] === true ? 'line-through' : 'none'}}>{tasks[unique].task}</p>
            {response[unique] === true ? <img id='checkImgTask' src={Check} alt="check"/> : <span onClick={() => setModal(true)}></span>}
            <Modal openModal={modal} closeModal={() => setModal(false)} taskTitle={tasks[unique].task} unique={unique}/>
        </div>
    );
}

export {HomeTask}