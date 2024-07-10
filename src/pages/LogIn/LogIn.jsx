//import react
import { useState, useEffect } from "react";

//import react router
import { useNavigate } from "react-router-dom";

//import cookies
import Cookies from "js-cookie";

//import styles
import './LogIn.css'

//import img
import hand from './assets/hand.png'
import phone from './assets/phone.png'
import earth from './assets/earth.png'
import google from './assets/google.png'

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
                <h1>Together for a <br /><span id='LogIn-leftHighlight'>Greener</span><br />Tomorrow</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus, nisi dignissim laoreet tempor, nisl leo malesuada dui, vitae vehicula sem lectus sit amet quam. Duis congue neque quam. Proin maximus leo a mauris posuere, sed iaculis dui efficitur. Nulla facilisi. Mauris quis enim ac justo interdum egestas ut ac justo. Donec lacus felis, molestie non feugiat nec, hendrerit ullamcorper libero.</p>
                <div className='LogIn-diagram'>
                    <img src={hand} alt="hand" />
                    <p>&rarr;</p>
                    <img src={phone} alt="phone" />
                    <p>&rarr;</p>
                    <img src={earth} alt="earth" />
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