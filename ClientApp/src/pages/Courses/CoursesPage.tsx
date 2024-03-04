import React from 'react';
import Box from "@mui/material/Box";
import { CourseCard } from "../../features/Course/CourseCard";

const CoursesPage = () => (
        <Box
            minWidth="100%"
            minHeight="100%"
            padding="24px 240px">
            <CourseCard/>
        </Box>
);

export default CoursesPage;