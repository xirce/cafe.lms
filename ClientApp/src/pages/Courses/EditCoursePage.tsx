import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Card, CardMedia, FormControl, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useGetCourseQuery, useGetPositionsQuery, useSaveLectureMutation } from "../../api/apiClient";
import { SaveCourseForm } from "../../components/Course/SaveCourseForm";
import { useParams } from "react-router-dom";

interface ILectureFormProps {
    courseId: string;
}

type LectureFormValues = {
    title: string;
    content: string;
    order: number;
    videoUrl?: string;
    courseId: string;
}

function CreateLectureForm(props: ILectureFormProps) {
    const [saveLecture] = useSaveLectureMutation();
    const { register, handleSubmit, watch, getValues } = useForm<LectureFormValues>({});

    console.log(getValues());

    const onSubmit = async (data: LectureFormValues) => {
        console.log(data);
        await saveLecture({ ...data });
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ width: '100%', gap: 4, flexDirection: 'row', justifyContent: 'start' }}>
            <Card variant='elevation' sx={{ minWidth: 440, height: 240 }}>
                <CardMedia
                    component="img"
                    width={440}
                    height={240}
                    alt="preview"
                />
            </Card>
            <Stack alignItems='start' justifyContent='space-between'>
                <Stack>
                    <Button variant='contained' type='submit'>Создать</Button>
                </Stack>
            </Stack>
        </FormControl>
    </form>;
}

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
            courseId
                ? <Box borderTop={1} borderColor='divider' pt={5}>
                    <Typography variant='h5' mb={2}>Содержимое</Typography>
                    <CreateLectureForm courseId={courseId} />
                </Box>
                : null
        }
    </>
}