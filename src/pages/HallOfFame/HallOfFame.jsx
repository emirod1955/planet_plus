//import react
import { useState, useEffect } from 'react';

//import react router
import { useNavigate } from 'react-router-dom';

//import cookies
import Cookies from 'js-cookie';

//import styles
import './HallOfFame.css'

const HallOfFame = () =>{
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});

    const getUserDetails = async (accessToken) => {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`);
        const data = await response.json();
        setUserDetails(data);
    };

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        if (!accessToken) {
            navigate("/");
        }

        getUserDetails(accessToken);
    }, [navigate]);

    return(
        <>
            {userDetails ? (
                <h1>Hall Of Fame</h1>
            ) : (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </>
    );
}

export {HallOfFame}