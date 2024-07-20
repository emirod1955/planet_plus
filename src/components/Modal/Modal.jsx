//import react
import { useEffect, useRef, useState, useCallback} from "react";

//import webcam
import Webcam from "react-webcam";

//import styles
import './Modal.css'

//import img
import check from '../../assets/img/check.svg'
import back from './assets/back.svg'
import gemini from './assets/gemini.png'

//import gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI('AIzaSyAfcda0jwF-bxh_wvfjKmxYeIIIbOCpizQ');

const Modal = ({openModal, closeModal}) => {
    const [imgSrc, setImgSrc] = useState()

    const webcamRef = useRef(null);
    const ref = useRef();

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    async function run() {
        const imageSrc = webcamRef.current.getScreenshot();

        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
        const prompt = "in this image you can check plastic recycling? Answer with yes or no only";
      
        const imageParts = {
            inlineData:{
                data: imageSrc.split(',')[1],
                mimeType: "image/png",
            },
        };

        console.log([imageParts])
      
        const result = await model.generateContent([prompt, [imageParts]]);
        const response = await result.response;
        const text = response.text();
      
        console.log(text);
      }


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
                    <button className="modal-bottom-verify" onClick={()=> run()}><p>verify</p> <img src={check} alt="check" /></button>
                </div>
            </div>
            <div className={imgSrc == null ? 'verifying-message' : 'verifying-message verifying'}>
                <div className="verifying-messageText">
                    <h1>Verifying with</h1>
                    <img src={gemini} alt="gemini" />
                </div>
                <p>This may take a while</p>
                <img src={imgSrc} alt="" />
            </div>
        </dialog>
    );
}

export {Modal}