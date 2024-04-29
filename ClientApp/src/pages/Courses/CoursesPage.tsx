import React from 'react';
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetCoursesQuery, useGetPermissionsQuery } from "../../api/apiClient";
import { CoursesList } from "../../components/CoursesList";
import { Permission } from "../../authorization/permissions";

export function CoursesPage() {
    const { data } = useGetCoursesQuery();
    const { data: permissions } = useGetPermissionsQuery();

    if (!data || !permissions)
        return null

    return <>
        <Stack direction='row' justifyContent='space-between' mb={5} pb={1} borderBottom={1} borderColor={'divider'}>
            <Typography variant='h4'>Все курсы</Typography>
            <Link to={'/courses/new'}>
                <Button variant='contained'>Создать курс</Button>
            </Link>
        </Stack>
        <CoursesList courses={data.courses} editable={permissions.permissions.includes(Permission.EditCourse)} />
    </>
}