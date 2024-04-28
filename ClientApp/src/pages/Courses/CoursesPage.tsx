import React from 'react';
import { CoursesList } from "../../components/CoursesList";
import Typography from "@mui/material/Typography";
import { useGetCoursesQuery } from "../../api/apiClient";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export function CoursesPage() {
    const { data, isSuccess } = useGetCoursesQuery();

    if (!isSuccess)
        return <Typography>Ошибка</Typography>

    return <>
        <Stack direction='row' justifyContent='space-between' mb={5} pb={1} borderBottom={1} borderColor={'divider'}>
            <Typography variant='h4'>Все курсы</Typography>
            <Link to={'/courses/new'}>
                <Button variant='contained'>Создать курс</Button>
            </Link>
        </Stack>
        <CoursesList courses={data.courses} editable />
    </>
}