import React from 'react';
import Box from "@mui/material/Box";
import { Outlet, useParams } from "react-router-dom";
import { CourseSideBar } from "../../components/Course/CourseSideBar";

const CoursePage = () => {
    const { courseId } = useParams();

    return <Box sx={{ display: 'flex' }}>
        <CourseSideBar />
        <Outlet />
    </Box>
};

export default CoursePage;