import React from 'react';
import { CoursesList } from "../../components/CoursesList";
import Typography from "@mui/material/Typography";
import { useGetCoursesQuery, useGetUserQuery } from "../../api/apiClient";
import { Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

export function MyCoursesPage() {
    const { data: user } = useGetUserQuery();
    const { data, isSuccess } = useGetCoursesQuery(user?.id, { skip: !user });

    if (!isSuccess)
        return <Typography>Ошибка</Typography>
    const coursesDone = data.courses.filter(c => c.progress?.unitsDoneCount === c.unitsCount).length;
    return <>
        <Stack direction='row' alignItems='baseline' gap={2} mb={5} pb={1} borderBottom={1} borderColor={'divider'}>
            <Typography variant='h4' mr={6}>Мои курсы</Typography>
            <Typography variant='h5' mr={6}>Всего - {data.courses.length}</Typography>
            {
                coursesDone < data.courses.length
                    ? <Stack>
                        <CheckCircle color='success' />
                        <Typography variant='h5' color='yellow'>В процессе - {data.courses.length - coursesDone}</Typography>
                    </Stack>
                    : null
            }
            {
                coursesDone > 0
                    ? <Stack direction='row' gap={1} alignItems='start'>
                        <CheckCircle color='success' sx={{ alignSelf: 'center' }} />
                        <Typography variant='h5'>Завершено - {coursesDone}</Typography>
                    </Stack>
                    : null
            }
        </Stack>
        <CoursesList courses={data.courses} />
    </>
}