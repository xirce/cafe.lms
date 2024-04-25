import React, { useEffect } from 'react';
import { CoursesList } from "../../components/CoursesList";
import Typography from "@mui/material/Typography";
import { instance } from "../../api/apiClient";

export function CoursesPage() {
    useEffect(() => {instance.get("http://localhost:5270/api/courses").then(console.log).catch(console.error)}, []);

    return <>
        <Typography variant='h4' mb={3}>Все курсы</Typography>
        <CoursesList/>
    </>
}