//import react
import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'

import loading from './types/loading.json'

//import cookies
import Cookies from "js-cookie";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI('AIzaSyAfcda0jwF-bxh_wvfjKmxYeIIIbOCpizQ');

//import react router
import { createBrowserRouter, RouterProvider, Outlet, useNavigate} from "react-router-dom";

//import general styles
import './assets/index.css'

import { ResponseContext } from './context';

//import components
import { TopNavBarHome } from './pages/TopNavBarHome/TopNavBarHome';
import { TopNavBar } from './pages/TopNavBar/TopNavBar';
import { SideNavBar } from './pages/SideNavBar/SideNavBar';

import { LogIn } from './pages/LogIn/LogIn';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Footprint } from './pages/Footprint/Footprint';
import { Badges } from './pages/Badges/Badges';
import { HallOfFame } from './pages/HallOfFame/HallOfFame';

  import {ErrorPage} from './pages/ErrorPage/ErrorPage'

import { Form } from './pages/Form/Form';

const LogInWrapper = () =>{
  return(
    <div>
      <TopNavBarHome/>
      <Outlet/>
    </div>
  );
}

const ErrorComponentsWrapper = () =>{
  return(
    <div>
      <TopNavBarHome/>
      <ErrorPage/>
    </div>
  );
}

const ComponentsWrapper = () =>{
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

  const [response, setResponse] = useState([true, false, true, true])
  const [actualCount, setActualeCount] = useState(response.filter(item => item === true).length);
  const [trueCount, setTrueCount] = useState(4)
  const [overview, setOverview] = useState('')
  const [tasks, setTasks] = useState(loading)

  useEffect(() => {
    const run = async() => {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
        const prompt = `Tell me 4 smalls tasks that you can verify with a photo without a caption that contribute to reducing my carbon footprint. ONLY GIVE ME THE TASK TITLE AND A PARAGRATH ON HOW TO TAKE THE PHOTO in json (if you can, task title 4 words or less)`;
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
    
        setTasks(JSON.parse(text.split('json')[1].split('```')[0]))
    }
    run()
  }, []);

  useEffect(() => {
    const run = async() => {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
        const prompt = `I did ${trueCount} tasks to contribute to my carbon footprint, motivate me to do more! IN A PARAGRAPH. Don't forget to mention how many tasks I did`;
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
    
        console.log(text)
        setOverview(text)
    }
    run()
  }, [trueCount]);

  const handleResponse = (res, pos) =>{
    setResponse(response, response[pos] = res)

    setActualeCount(response.filter(item => item === true).length)
    if(res === true){
        setTrueCount(prevCount => prevCount + 1)
    }
    console.log(response)
  }

  const AllTaskTrue = async() => {
    setResponse([false, false, false, false])

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
    const prompt = `Tell me 4 smalls tasks that you can verify with a photo that contribute to reducing my carbon footprint. ONLY GIVE ME THE TASK TITLE AND A PARAGRATH ON HOW TO TAKE THE PHOTO in json (if you can, task title 4 words or less)`;
    
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    setTasks(JSON.parse(text.split('json')[1].split('```')[0]))
    console.loh(tasks)
  }

  return(
    <>
      {userDetails ? (
        <ResponseContext.Provider value={{response, handleResponse, actualCount, trueCount, overview, AllTaskTrue, tasks}}>
          <TopNavBar/>
          <div className='desktop-content'>
            <SideNavBar/>
            <Outlet/>
          </div>
        </ResponseContext.Provider>
      ) : (
        <div>
            <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogInWrapper/>,
      errorElement: <ErrorComponentsWrapper/>,
      children:[
        {
          path: "/",
          element: <LogIn/>
        },
        {
          path: '/form',
          element: <Form/>
        }
      ]
    },
    {
      path: '/',
      element: <ComponentsWrapper/>,
      children:[
        {
          path: '/dashboard',
          element: <Dashboard/>
        },
        {
          path: '/your-footprint',
          element: <Footprint />
        },
        {
          path: '/badges',
          element: <Badges/>
        },
        {
          path: '/hall-of-fame',
          element: <HallOfFame/>
        }
      ]
    }
  ]);  

  ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
  )