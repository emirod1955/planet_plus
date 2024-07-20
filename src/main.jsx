//import react
import React from 'react'
import ReactDOM from 'react-dom/client'

//import react router
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

//import general styles
import './assets/index.css'

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

const ComponentsWrapper = () =>{
  return(
    <div>
      <TopNavBar/>
      <div className='desktop-content'>
        <SideNavBar/>
        <Outlet/>
      </div>
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