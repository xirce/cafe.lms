import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import CoursesPage from "./pages/Courses/CoursesPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./features/Header/Header";
import Toolbar from "@mui/material/Toolbar";

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: "/courses",
        element: <CoursesPage />,
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Header/>
            <Toolbar/>
        <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
