import React from 'react';
import { CoursesList } from "../../components/CoursesList";
import Typography from "@mui/material/Typography";

export function MyCoursesPage() {
    return <>
        <Typography variant='h4' mb={3}>Мои курсы</Typography>
        <CoursesList/>
    </>
}