//import react
import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'

//import data
import loading from './types/loading.json'

//import cookies
import Cookies from "js-cookie";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI('AIzaSyAfcda0jwF-bxh_wvfjKmxYeIIIbOCpizQ');

//import react router
import { createBrowserRouter, RouterProvider, Outlet, useNavigate} from "react-router-dom";

//import general styles
import './assets/index.css'

//imort context
import { ResponseContext } from './context';

//import axios
import axios from 'axios';

//import components
import { TopNavBarHome } from './pages/TopNavBarHome/TopNavBarHome';
import { TopNavBar } from './pages/TopNavBar/TopNavBar';
import { SideNavBar } from './pages/SideNavBar/SideNavBar';

import { LogIn } from './pages/LogIn/LogIn';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Footprint } from './pages/Footprint/Footprint';
import { Awards } from './pages/Awards/Awards';
import { HallOfFame } from './pages/HallOfFame/HallOfFame';

  import {ErrorPage} from './pages/ErrorPage/ErrorPage'

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
  const [userDetails, setUserDetails] = useState({id: '000000000000000000000'});

  const [datas, setDatas] = useState([])
  const [user, setUser] = useState([])

  const [trueCount, setTrueCount] = useState(0)
  const [actualCount, setActualCount] = useState(0);
  const [tasks, setTasks] = useState(loading)

  const [response, setResponse] = useState([false, false, false, false])

//getting user details and data
  const getUserDetails = async (accessToken) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`);
    const data = await response.json();
    setUserDetails(data);
  };

  //auth
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      navigate("/");
    }
    getUserDetails(accessToken);
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:8081/users')
    .then(res => res.json())
    .then(data => setDatas(data))
    .catch(err => console.log(err))

    setUser(datas.filter(user => user.google_id == userDetails.id))
  }, [userDetails]);

  const run = async() => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Tell me 4 smalls tasks that you can verify with a photo that contribute to reducing my carbon footprint. ONLY GIVE ME THE TASK TITLE AND A PARAGRATH ON HOW TO TAKE THE PHOTO in json (if you can, task title 4 words or less)`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    setTasks(JSON.parse(text.split('json')[1].split('```')[0]))
  }

  const handleAddUser = () => {
    axios.post('http://localhost:8081/add-user', {
      google_id: userDetails.id,
      username: userDetails.name,
      nmbr_tsk_completed: 0,
      actual_count: 0,
      user_picture: userDetails.picture
    })
    .then(response => {
      run()
      console.log(response.data);
    })
    .catch(error => {
      console.error('There was an error adding the user!', error);
    });
  };

  useEffect(() => {
    if (user.length == 0){
      console.log('si cargo la base de datos y el usuario no existe en ella')
      handleAddUser()
    }
    if (user.length == 1){
      console.log('si cargo la base de datos y el usuario existe en ella')
      setTrueCount(user[0].nmbr_tsk_completed) //set trueCount with db
      setTasks(
        [
          {
            "task": user[0].task_1_name,
            "photo_instructions": user[0].task_1_description
          },
          {
            "task": user[0].task_2_name,
            "photo_instructions": user[0].task_2_description
          },
          {
            "task": user[0].task_3_name,
            "photo_instructions": user[0].task_3_description
          },
          {
            "task": user[0].task_4_name,
            "photo_instructions": user[0].task_4_description
          }
        ]
      )
      setResponse([
        user[0].state_1 == 1 ? true : false, 
        user[0].state_2 == 1 ? true : false,
        user[0].state_3 == 1 ? true : false,
        user[0].state_4 == 1 ? true : false,
      ])
      setActualCount(user[0].actual_count)
    }
  }, [user]);

  useEffect(() => {
    console.log(user)
  }, [user])

  const [overview, setOverview] = useState('')

  //Agregar que cuando el valor de trueCount cambie se actualice la base de datos
  useEffect(() => {
    const overwiewRun = async() => {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
        const prompt = `I did ${trueCount} tasks to contribute to my carbon footprint, motivate me to do more! IN A PARAGRAPH. Don't forget to mention how many tasks I did`;
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
  
        setOverview(text)
    }
    overwiewRun()
  }, [trueCount]);

  const handleUpdate = (googleId) => {
    axios.post('http://localhost:8081/update-tasks', {
      google_id: googleId,
      nmbr_tsk_completed: trueCount,
      actual_count: actualCount,
      task_1_name: tasks[0].task,
      task_1_description: tasks[0].photo_instructions,
      state_1: response[0],
      task_2_name: tasks[1].task,
      task_2_description: tasks[1].photo_instructions,
      state_2: response[1],
      task_3_name: tasks[2].task,
      task_3_description: tasks[2].photo_instructions,
      state_3: response[2],
      task_4_name: tasks[3].task,
      task_4_description: tasks[3].photo_instructions,
      state_4: response[3]
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('There was an error updating the tasks!', error);
    });
  }

  // Update database when trueCount+ or task change, depending on googleId
  useEffect(() => {
    const googleId = userDetails.id
    handleUpdate(googleId)
  }, [trueCount, tasks])

  useEffect(() => {
    console.log(actualCount)
  }, [actualCount])

  const updateStateAtPosition = (position, value) => {
    setResponse(prevState => 
      prevState.map((item, index) => index === position ? value : item)
    );
  };

  const handleResponse = (res, pos) =>{
    updateStateAtPosition(pos, res)
    if(res === true){
        setTrueCount(prevCount => prevCount + 1)
        if (actualCount < 8){
          setActualCount(prevCount => prevCount + 1)
        } else if (actualCount == 8){
          setActualCount(0)
        }
    }
  }

  useEffect(()=>{
    console.log(response)
  }, [response])

  useEffect(()=>{
    console.log(userDetails)
  }, [userDetails])

  const AllTaskTrue = async() => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
    const prompt = `Tell me 4 smalls tasks that you can verify with a photo that contribute to reducing my carbon footprint. ONLY GIVE ME THE TASK TITLE AND A PARAGRATH ON HOW TO TAKE THE PHOTO in json (if you can, task title 4 words or less)`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
  
    setTasks(JSON.parse(text.split('json')[1].split('```')[0]))
    setResponse([false, false, false, false])
  }

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

  return(
    <>
      {userDetails ? (
        <ResponseContext.Provider value={{response, handleResponse, actualCount, trueCount, overview, AllTaskTrue, tasks, datas, userDetails, handleFace, facingMode}}>
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
          path: '/awards',
          element: <Awards/>
        },
        {
          path: '/hall-of-fame',
          element: <HallOfFame/>
        }
      ]
    }
  ]);  

  ReactDOM.createRoot(document.getElementById('root')).render(
        <RouterProvider router={router} />
  )