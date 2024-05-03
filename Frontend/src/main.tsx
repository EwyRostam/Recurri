import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import Login from './components/Login/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewTemplate from './components/Home/ViewTemplate/ViewTemplate';
import EditTemplate from './components/Home/EditTemplate/EditTemplate';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/home/*",
    element: <Home />,
  },
  {
    path: "home/createtemplate",
    element: <Home />,
  },
  {
    path: "home/createtemplate/*",
    element: <Home />,
  },
  {
    path: "home/editTemplate/*",
    element: <EditTemplate />,
  },
  {
    path: "home/template/*",
    element: <ViewTemplate />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(

  <GoogleOAuthProvider clientId='1021052820543-fm1vrkkpkq1idpvckttevn0ir9d9qdc2.apps.googleusercontent.com'>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className='font-primary'>
          <ToastContainer />
            <RouterProvider router={router} />
          </div>
        </LocalizationProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)


