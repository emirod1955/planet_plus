//import react
import { useState, useEffect } from "react";

//import react router
import { useNavigate } from "react-router-dom";

//import cookies
import Cookies from "js-cookie";

//import styles
import './LogIn.css'

//import img
import google from './assets/google.webp'

const LogIn = () =>{
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);

    const handleClick = () => {
        const callbackUrl = `${window.location.origin}`;
        const googleClientId = "963370955149-oi404cughhpmjt9udpf1n2343pq3acev.apps.googleusercontent.com";
        const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
          callbackUrl
        )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
        window.location.href = targetUrl;
      };

      useEffect(() => {
        const accessTokenRegex = /access_token=([^&]+)/;
        const isMatch = window.location.href.match(accessTokenRegex);
    
        if (isMatch) {
          const accessToken = isMatch[1];
          Cookies.set("access_token", accessToken);
          setIsLoggedin(true);
        }
      }, []);

      useEffect(() => {
        if (isLoggedin) {
          navigate("/dashboard");
        }
      }, [isLoggedin, navigate]);

    return(
        <div className='LogIn'>
            <div className='LogIn-left'>
                <div className="LogIn-leftText">
                  <h1>Together for a <br /><span id='LogIn-leftHighlight'>Greener</span><br />Tomorrow</h1>
                  <p>Log in with Google to continue your journey towards a greener future. Discover simple, impactful tasks, powered by Gemini AI, that help you reduce your carbon footprint, one step at a time.</p>
                  <p><span id="LogIn-leftText-black">Not a member yet?</span> <span id="LogIn-leftText-blue" onClick={handleClick}>Join us today</span> and start making a difference!</p>
                </div>
                <div className='LogIn-leftButton'>
                    <button onClick={handleClick}><img src={google} alt="" /><p>Continue with Google</p></button>
                </div>
            </div>
            <div className='LogIn-right'></div>
        </div>
    );
}

export {LogIn}