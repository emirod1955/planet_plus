//import react
import { useEffect, useRef, useState} from "react";

//import webcam
import Webcam from "react-webcam";

//import styles
import './Modal.css'
import './assets/loading.css'

//import img
import check from '../../assets/img/check.svg'
import back from './assets/back.svg'
import gemini from './assets/gemini.png'

//import gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI('AIzaSyAfcda0jwF-bxh_wvfjKmxYeIIIbOCpizQ');

const Modal = ({openModal, closeModal, taskTitle}) => {
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

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
        setLoading(true)
        setResponse('');

        const imageSrc = webcamRef.current.getScreenshot();

        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
        const prompt = `say me that if the task: ${taskTitle}, can be seen in the photo? Answer with yes or no only`;
      
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
      
        setResponse(text);
        console.log(text);
      }


    return (
        <dialog className="modal" ref={ref} onCancel={closeModal}>
            <div className={loading == false ? 'modalBox' :  'modalBox blank'}>
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
            <div className={loading == true && aiResponse == '' ? 'verifying-message' : 'verifying-message blank'}>
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <div className={loading == true && aiResponse != '' ? 'verifying-message-not-verified' : 'verifying-message blank'}>
                <p>{aiResponse}</p>
            </div>
        </dialog>
    );
}

export {Modal}