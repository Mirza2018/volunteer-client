import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './component/Home.jsx';
import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import DonationSingle from './component/DonationSingle.jsx';
import PrivetRoute from './component/PrivetRoute.jsx';
import Volunteer from './component/Volunteer.jsx';
import AdimPenal from './component/AdimPenal.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/volunteerpage',
        element: <PrivetRoute><Volunteer></Volunteer></PrivetRoute>
      },
      {
        path: '/adminpage',
        element: <PrivetRoute><AdimPenal></AdimPenal></PrivetRoute>
      },

      {
        path: '/donation/:id',
        element: <PrivetRoute><DonationSingle></DonationSingle></PrivetRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/volunteer/${params.id}`)
      },


    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
