import React from "react";
import { useParams } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useGetCourseQuery, useGetPositionsQuery } from "../../api/apiClient";
import { SaveCourseForm } from "../../components/Course/SaveCourseForm";
import { UnitsList } from "../../components/UnitsList";

export function EditCoursePage() {
    const { data: positions } = useGetPositionsQuery();
    const { courseId } = useParams();
    const { data: course } = useGetCourseQuery({ courseId: courseId as string }, { skip: !courseId });

    if (!positions || courseId && !course)
        return <Typography>Ошибка</Typography>

    return <>
        <Stack mb={5} pb={1} borderBottom={1} borderColor={'divider'}>
            <Typography variant='h4'>{course ? 'Изменение курса' : 'Создание курса'}</Typography>
        </Stack>
        <Box pb={5}>
            <Typography variant='h5' mb={2}>Описание</Typography>
            <SaveCourseForm positions={positions.positions} course={course} />
        </Box>
        {
            course
                ? <Box borderTop={1} borderColor='divider' pt={5}>
                    <Typography variant='h5' mb={2}>Содержание</Typography>
                    <UnitsList courseId={course.id} units={course.units} />
                </Box>
                : null
        }
    </>
}