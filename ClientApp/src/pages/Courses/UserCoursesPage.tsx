import React from 'react';
import { CoursesList } from "../../components/CoursesList";
import Typography from "@mui/material/Typography";
import { useGetCoursesQuery, useGetUserQuery } from "../../api/apiClient";
import { Stack } from "@mui/material";
import { CheckCircle, Timelapse } from "@mui/icons-material";
import { amber } from "@mui/material/colors";
import { useParams } from "react-router-dom";

export function UserCoursesPage() {
    const { userId } = useParams();
    const { data: currentUser } = useGetUserQuery();
    const { data: targetUser } = useGetUserQuery(userId);
    const { data, isSuccess } = useGetCoursesQuery(userId || targetUser?.id, { skip: !targetUser });

    if (!targetUser || !data)
        return null;

    const coursesDone = data.courses.filter(c => c.progress?.unitsDoneCount === c.unitsCount).length;
    const myCourses = !userId || currentUser?.id === userId;

    return <>
        <Stack direction='row' alignItems='baseline' gap={2} mb={5} pb={1} borderBottom={1} borderColor={'divider'}>
            <Typography
                variant='h4'
                mr={myCourses ? 6 : 0}>
                {myCourses ? 'Мои курсы' : `Курсы`}
            </Typography>
            {
                !myCourses ?
                    <Typography variant='h5' mr={6} sx={{textDecoration: 'underline'}}>
                        {targetUser.lastName} {targetUser.firstName}
                    </Typography> : null
            }
            <Typography variant='h5' mr={6}>Всего - {data.courses.length}</Typography>
            {
                coursesDone < data.courses.length
                    ? <Stack direction='row' gap={1} alignItems='start'>
                        <Timelapse sx={{ alignSelf: 'center', color: amber.A400 }} />
                        <Typography variant='h5'>В процессе - {data.courses.length - coursesDone}</Typography>
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
        <CoursesList courses={data.courses} userId={userId} />
    </>
}