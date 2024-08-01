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

//import data
import data from '../../../types/data.json'

const TaskFootprint = ({unique}) => {
    const [modal, setModal] = useState(false)

    const { response } = useContext(ResponseContext)

    return(
            <div className='TaskFootprint'>
                <h3 >{data.task[unique].title}</h3>
                <p className='TaskFootprint-content'>{data.task[unique].details}</p>
                <div className='TaskFootprint-bottom'>
                    <button style={{
                            backgroundColor : response[unique] == 'true' ? '#4bcc31' : '#3170cc',
                            cursor : response[unique] == 'true' ? 'auto' : 'pointer',
                        }} 
                        onClick={() => response[unique] == 'true' ? setModal(false) : setModal(true)}>
                        <p style={{display : response[unique] == 'true' ? 'none' : 'block'}}>verify</p>
                        <img src={check} alt="check" />
                    </button>
                </div>
                <Modal openModal={modal} closeModal={() => setModal(false)} taskTitle={data.task[unique].title} unique={unique}/>
            </div>
    );
}

export {TaskFootprint}