import React from 'react'
import ReactDOM from 'react-dom/client'

//import react router
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

//import general styles
import './assets/index.css'

//import components
import { TopNavBar } from './pages/TopNavBar/TopNavBar';
import { SideNavBar } from './pages/SideNavBar/SideNavBar';

import { Home } from './pages/Home/Home';

  import {ErrorPage} from './pages/ErrorPage/ErrorPage'

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
      <TopNavBar/>
      <div className='desktop-content'>
        <SideNavBar/>
        <ErrorPage/>
      </div>
    </div>
  );
}

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ComponentsWrapper/>,
      errorElement: <ErrorComponentsWrapper/>,
      children:[
        {
          path: '/',
          element: <Home/>
        }
      ]
    }
  ]);  

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
  )