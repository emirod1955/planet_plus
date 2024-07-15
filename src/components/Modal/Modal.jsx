//import react
import { useEffect, useRef, useState, useCallback } from "react";

//import webcam
import Webcam from "react-webcam";

//import styles
import './Modal.css'

//import img
import check from '../../assets/img/check.svg'
import back from './assets/back.svg'
import gemini from './assets/gemini.png'


const Modal = ({openModal, closeModal}) => {
    const [imgSrc, setImgSrc] = useState(null);

    const webcamRef = useRef(null);
    const ref = useRef();

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    return (
        <dialog className="modal" ref={ref} onCancel={closeModal}>
            <div className={imgSrc == null ? 'modalBox' : 'modalBox verifying'}>
                <div className="modal-top">
                    <div className="modal-topText">
                        <h1>Take a picture</h1>
                        <p>Take a photo that verifies your task and get improvements in your environment</p>
                    </div>
                    <button onClick={closeModal}><img src={back} alt="go back" /></button>
                </div>
                <Webcam className="modalVideo" ref={webcamRef}/>
                <div className="modal-bottom">
                    <button className="modal-bottom-verify" onClick={capture}><p>verify</p> <img src={check} alt="check" /></button>
                </div>
            </div>
            <div className={imgSrc == null ? 'verifying-message' : 'verifying-message verifying'}>
                <div className="verifying-messageText">
                    <h1>Verifying with</h1>
                    <img src={gemini} alt="gemini" />
                </div>
                <p>This may take a while</p>
            </div>
        </dialog>
    );
}

export {Modal}