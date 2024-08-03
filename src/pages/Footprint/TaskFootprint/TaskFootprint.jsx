//import react
import { useState, useContext } from 'react';

//import context
import { ResponseContext } from "../../../context";

//import components
import {Modal} from '../../../components/Modal/Modal';

//import img
import check from '../../../assets/img/check.svg'

//import styles
import './TaskFootprint.css'

const TaskFootprint = ({unique}) => {
    const [modal, setModal] = useState(false)

    const { response, tasks } = useContext(ResponseContext)

    return(
            <div className='TaskFootprint'>
                <h3 >{tasks[unique].task}</h3>
                <p className='TaskFootprint-content'>{tasks[unique].photo_instructions}</p>
                <div className='TaskFootprint-bottom'>
                    <button style={{
                            backgroundColor : response[unique] === true ? '#00ba00' : '#3170cc',
                            cursor : response[unique] === true ? 'auto' : 'pointer',
                        }} 
                        onClick={() => response[unique] === true ? setModal(false) : setModal(true)}>
                        <p style={{display : response[unique] === true ? 'none' : 'block'}}>verify</p>
                        <img src={check} alt="check" />
                    </button>
                </div>
                <Modal openModal={modal} closeModal={() => setModal(false)} taskTitle={tasks[unique].task} unique={unique}/>
            </div>
    );
}

export {TaskFootprint}