import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import CoursesPage from "./pages/Courses/CoursesPage";
import CoursePage from "./pages/Courses/CoursePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import Toolbar from "@mui/material/Toolbar";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import CssBaseline from "@mui/material/CssBaseline";
import { Unit } from "./pages/Courses/Unit";

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: "",
        element: <CoursesPage/>,
    },
    {
        path: "courses",
        element: <CoursesPage/>,
    },
    {
        path: "courses/:courseId",
        element: <CoursePage/>,
        children: [
            {
                path: "unit/:unitId",
                element: <Unit/>
            }
        ]
    },
    {
        path: "profile",
        element: <ProfilePage/>,
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline/>
            <Header/>
            <Toolbar/>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
