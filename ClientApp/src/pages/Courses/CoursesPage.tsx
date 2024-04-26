import React from 'react';
import { CoursesList } from "../../components/CoursesList";
import Typography from "@mui/material/Typography";
import { useGetCoursesQuery } from "../../api/apiClient";

export function CoursesPage() {
    const { data, isSuccess } = useGetCoursesQuery();

    if (!isSuccess)
        return <Typography>Ошибка</Typography>

    return <>
        <Typography variant='h4' mb={3}>Все курсы</Typography>
        <CoursesList courses={data.courses} />
    </>
}