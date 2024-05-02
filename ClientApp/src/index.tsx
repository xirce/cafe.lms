import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { CoursesPage } from "./pages/Courses/CoursesPage";
import CoursePage from "./pages/Course/CoursePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import CssBaseline from "@mui/material/CssBaseline";
import { Lecture } from "./pages/Course/Lecture";
import { LayoutWithHeader } from "./pages/LayoutWithHeader";
import { ContainerLayout } from "./pages/ContainerLayout";
import { Quiz } from "./pages/Course/Quiz";
import { CourseLayout } from "./pages/CourseLayout";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserCoursesPage } from "./pages/Courses/UserCoursesPage";
import { EditCoursePage } from "./pages/Course/EditCoursePage";
import { EditLecturePage } from "./pages/Lecture/EditLecturePage";
import { UsersPage } from "./pages/Users/UsersPage";
import { CourseOverviewPage } from "./pages/Course/CourseOverviewPage";

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
                        element: <UserCoursesPage />,
                    },
                    {
                        path: "users/:userId/courses",
                        element: <UserCoursesPage />,
                    },
                    {
                        path: 'users',
                        element: <UsersPage />
                    },
                    {
                        path: "profile",
                        element: <ProfilePage />,
                    },
                    {
                        path: 'courses/new',
                        element: <EditCoursePage />
                    },
                    {
                        path: 'courses/:courseId/overview',
                        element: <CourseOverviewPage />
                    },
                    {
                        path: 'courses/:courseId/edit',
                        element: <EditCoursePage />
                    },
                    {
                        path: 'courses/:courseId/unit/new',
                        element: <EditLecturePage />
                    },
                    {
                        path: 'courses/:courseId/unit/:unitId/edit',
                        element: <EditLecturePage />
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
