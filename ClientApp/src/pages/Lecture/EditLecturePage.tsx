import React from "react";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { useGetCourseQuery, useGetLectureQuery } from "../../api/apiClient";
import Typography from "@mui/material/Typography";
import { SaveLectureForm } from "../../components/Lecture/SaveLectureForm";


export function EditLecturePage() {
    const { unitId, courseId } = useParams();
    const { data: course } = useGetCourseQuery({courseId: courseId!});
    const { data: lecture } = useGetLectureQuery(unitId!);

    if (!course || !lecture)
        return null;

    return <>
        <Stack mb={5} pb={1} borderBottom={1} borderColor={'divider'}>
            <Typography variant='h4'>{unitId ? 'Изменение лекции' : 'Создание лекции'}</Typography>
        </Stack>
        <SaveLectureForm courseId={courseId!} order={course.unitsCount + 1} lecture={lecture} />
    </>;
}