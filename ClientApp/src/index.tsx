import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { CoursesPage } from "./pages/Courses/CoursesPage";
import CoursePage from "./pages/Courses/CoursePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import CssBaseline from "@mui/material/CssBaseline";
import { Lecture } from "./pages/Courses/Lecture";
import { LayoutWithHeader } from "./pages/LayoutWithHeader";
import { ContainerLayout } from "./pages/ContainerLayout";
import { Quiz } from "./pages/Courses/Quiz";
import { CourseLayout } from "./pages/CourseLayout";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { MyCoursesPage } from "./pages/Courses/MyCoursesPage";

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: "",
        element: <LayoutWithHeader />,
        children: [
            {
                path: "",
                element: <ContainerLayout />,
                children: [
                    {
                        path: "",
                        element: <CoursesPage />,
                    },
                    {
                        path: "courses",
                        element: <CoursesPage />,
                    },
                    {
                        path: "my-courses",
                        element: <MyCoursesPage />,
                    },
                    {
                        path: "profile",
                        element: <ProfilePage />,
                    },
                ]
            },
            {
                path: "courses/:courseId",
                element: <CoursePage />,
                children: [
                    {
                        path: "unit/:unitId",
                        element: <CourseLayout />,
                        children: [
                            {
                                path: "",
                                element: <Lecture />,
                            },
                            {
                                path: "lecture",
                                element: <Lecture />,
                            },
                            {
                                path: "test",
                                element: <Quiz />,
                            }
                        ]
                    }
                ]
            },
        ],

    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
