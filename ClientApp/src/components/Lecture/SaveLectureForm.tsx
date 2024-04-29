import { ILecture } from "../../types";
import { useForm } from "react-hook-form";
import { useSaveLectureMutation } from "../../api/apiClient";
import { Button, FormControl, Grid, Stack, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ISaveLectureFormProps {
    courseId: string;
    order: number;
    lecture?: ILecture,
}

type SaveLectureFormValues = {
    lectureId?: string;
    title: string;
    content: string;
    order: number;
    videoUrl?: string;
    courseId: string;
}

export function SaveLectureForm(props: ISaveLectureFormProps) {
    const { register, handleSubmit, formState, reset } = useForm<SaveLectureFormValues>({
        defaultValues: {
            lectureId: props.lecture?.id,
            title: props.lecture?.title,
            content: props.lecture?.content,
            order: props.lecture?.order ?? props.order,
            courseId: props.courseId
        }
    });
    const [saveLecture] = useSaveLectureMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: SaveLectureFormValues) => {
        console.log(data);
        const lecture = await saveLecture({
            lectureId: data.lectureId,
            courseId: props.courseId!,
            title: data.title,
            content: data.content,
            order: data.order,
        }).unwrap();
        reset(undefined, { keepValues: true });
        if (!props.lecture)
            navigate(`/courses/${lecture.courseId}/unit/${lecture.id}/edit`);
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ width: '100%', gap: 4, flexDirection: 'column', justifyContent: 'start' }}>
            <Grid item>
                <TextField label='Название лекции' {...register('title')} />
            </Grid>
            <Grid item>
                <TextField
                    id="lecture-content"
                    multiline
                    rows={10}
                    variant="outlined"
                    label='Текст лекции'
                    fullWidth
                    {...register('content')}
                />
            </Grid>
            <Stack direction='row' alignItems='end' gap={3}>
                <Button disabled={!formState.isDirty || !formState.isValid} variant='contained'
                        type='submit'>{props.lecture ? 'Сохранить' : 'Создать'}</Button>
            </Stack>
        </FormControl>
    </form>;
}
