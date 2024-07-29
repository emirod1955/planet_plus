//import react
import { useState, useContext } from 'react';

//import context
import { ResponseContext } from "../context";

//import components
import {Modal} from '../../../components/Modal/Modal';

//import img
import check from '../../../assets/img/check.svg'

//import styles
import './TaskFootprint.css'

const TaskFootprint = ({title, content, unique}) => {
    const [modal, setModal] = useState(false)

    const { response } = useContext(ResponseContext)

    return(
        
            <div className='TaskFootprint'>
                <h3 >{title}</h3>
                <p className='TaskFootprint-content'>{content}</p>
                <div className='TaskFootprint-bottom'>
                    <button style={{backgroundColor : response[unique] == 'true' ? '#4bcc31' : '#3170cc'}} onClick={() => setModal(true)}>
                        <p style={{display : response[unique] == 'true' ? 'none' : 'block'}}>verify</p>
                        <img src={check} alt="check" />
                    </button>
                </div>
                <Modal openModal={modal} closeModal={() => setModal(false)} taskTitle={title} unique={unique}/>
            </div>
        
    );
}

export {TaskFootprint}