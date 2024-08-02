//import react
import { useState, useContext } from 'react';

//import styles
import './Task.css';

//import components
import { Modal } from '../../../components/Modal/Modal';

//import state
import { ResponseContext } from '../../../context';

//import data
import data from '../../../types/data.json'

//import images
import Check from './assets/check.png';

const HomeTask = ({unique}) =>{
    const [modal, setModal] = useState(false)
    const { response } = useContext(ResponseContext)

    return (
        <div className="task">
            <p style={{textDecoration : response[unique] === true ? 'line-through' : 'none'}}>{data.task[unique].title}</p>
            {response[unique] === true ? <img id='checkImgTask' src={Check} alt="check"/> : <span onClick={() => setModal(true)}></span>}
            <Modal openModal={modal} closeModal={() => setModal(false)} taskTitle={data.task[unique].title} unique={unique}/>
        </div>
    );
}

export {HomeTask}