//import react
import { useState } from 'react';

//import components
import { Modal } from '../../../components/Modal/Modal';

//import img
import check from '../../../assets/img/check.svg'

//import styles
import './TaskFootprint.css'

const TaskFootprint = ({title, content, state}) => {
    const [modal, setModal] = useState(false)
    return(
        <div className='TaskFootprint'>
            <h3>{title}</h3>
            <p className='TaskFootprint-content'>{content}</p>
            <div className='TaskFootprint-bottom'>
                <button style={{backgroundColor : state ? '#00ba00' : '#3170cc', cursor : state ? 'auto' : 'pointer'}} onClick={() => state ? setModal(false) : setModal(true)}>
                    <p style={{display : state ? 'none' : 'block'}}>verify</p>
                    <img src={check} alt="check" />
                </button>
            </div>
            <Modal openModal={modal} closeModal={() => setModal(false)}/>
        </div>
    );
}

export {TaskFootprint}