import React from 'react';
import Box from "@mui/material/Box";
import { CourseCard } from "../../components/Course/CourseCard";

const CoursesPage = () => (
    <Box
        minWidth="100%"
        minHeight="100%"
        padding="24px 240px">
        <CourseCard id={'course1'} title={'Курс 123'}/>
    </Box>
);

export default CoursesPage;