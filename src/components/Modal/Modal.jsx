//import react
import React, { useEffect, useRef, useState, useContext } from "react";

//import context
import { ResponseContext } from "../../context";

//import webcam
import Webcam from "react-webcam";

//import styles
import './Modal.css'
import '../../assets/loading.css'

//import img
import check from '../../assets/img/check.svg'
import back from './assets/back.svg'
import verifiedImg from './assets/verifiedImg.svg'
import notVerifiedImg from './assets/notVerifiedImg.svg'
import turn from './assets/refresh.svg'

//import gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI('AIzaSyAfcda0jwF-bxh_wvfjKmxYeIIIbOCpizQ');

function stringToBoolean(str) {
    if (typeof str === 'string') {

      const cleanedStr = str.trim().toLowerCase();

      if (cleanedStr === 'true') {
        return true;
      } else if (cleanedStr === 'false') {
        return false;
      }
    }
    
    return false;
  }

const Modal = ({openModal, closeModal, taskTitle, unique}) => {
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const webcamRef = useRef(null);
    const ref = useRef();

    const { handleResponse, response, AllTaskTrue } = useContext(ResponseContext)

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    const FACING_MODE_USER = "user";
    const FACING_MODE_ENVIRONMENT = "environment";

    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

    const handleFace = React.useCallback(() => {
        setFacingMode((prevState) =>
          prevState === FACING_MODE_USER
            ? FACING_MODE_ENVIRONMENT
            : FACING_MODE_USER
        );
      }, []);

    const run = async() => {
        setLoading(true)
        setResponse('');

        const imageSrc = webcamRef.current.getScreenshot();

        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
        const prompt = `can you detect that the activity: (${taskTitle}) can be supposed with the following image? answer with 'true' or 'false' ONLY`;
      
        const imageParts = {
            inlineData:{
                data: imageSrc.split(',')[1],
                mimeType: "image/png",
            },
        };

        const result = await model.generateContent([prompt, [imageParts]]);
        const response = await result.response;
        const text = response.text();

        console.log(text)

        setResponse(text);
        handleResponse(stringToBoolean(text) , unique);
      }

    const handleVerified = () =>{
        if (response.every(state => state === true)) {
            closeModal()
            setLoading(false)
            setResponse('')
            AllTaskTrue()
        } else {
            closeModal()
            setLoading(false)
            setResponse('')
        }
    }

    const handleNotVerified = () =>{
        closeModal()
        setLoading(false)
        setResponse('');
    }

    return (
        <dialog className="modal" ref={ref} onCancel={closeModal}>
            <div className={loading == false ? 'modalBox' : 'modalBox blank'}>
                <div className="modal-top">
                    <div className="modal-topText">
                        <h1>Take a picture</h1>
                        <p>Take a photo that verifies your task and get improvements in your environment</p>
                    </div>
                    <button onClick={closeModal}><img src={back} alt="go back" /></button>
                </div>
                    <Webcam className="modalVideo" ref={webcamRef} audio={false} videoConstraints={{facingMode: facingMode}}/>
                <div className="modal-bottom">
                    <button onClick={handleFace} className="modal-bottom-turn"><img src={turn} alt="turn camera face" /></button>
                    <button className="modal-bottom-verify" onClick={()=> run()}><p>verify</p> <img src={check} alt="check" /></button>
                </div>
            </div>
            <div className={loading == true && aiResponse == '' ? 'verifying-message' : 'verifying-message blank'}>
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <div className={loading == true && aiResponse != '' ? 'verifying-message-not-verified' : 'verifying-message blank'}>
                { aiResponse == 'true' || response[unique] == true ? 
                    <div className="TaskVerified">
                        <div className="TaskVerified-top">
                            <div className="iconImgBox"><img src={verifiedImg} alt="check" /></div>
                            <h2>Verified Task</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus, nisi dignissim laoreet tempor, nisl leo malesuada dui, vitae vehicula sem lectus sit amet quam.</p>
                        </div>
                        <input type="button" value="Nice!" onClick={() => handleVerified()}/>
                    </div> 
                    :
                    <div className="TaskNotVerified">
                        <div className="TaskVerified-top">
                            <div className="iconImgBox"><img src={notVerifiedImg} alt="check" /></div>
                            <h2>Unverified Task</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus, nisi dignissim laoreet tempor, nisl leo malesuada dui, vitae vehicula sem lectus sit amet quam.</p>
                        </div>
                        <input type="button" value="Go Back" onClick={() => handleNotVerified()}/>
                    </div>
                }
            </div>
        </dialog>
    );
};

export {Modal}