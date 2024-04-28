import { Button, Card, CardMedia, FormControl, Grid, MenuItem, Stack, TextField } from "@mui/material";
import { useSaveCourseMutation } from "../../api/apiClient";
import { useForm } from "react-hook-form";
import { ICourseShortInfo, IPosition } from "../../types";
import { useNavigate } from "react-router-dom";


interface ISaveCourseFormProps {
    course?: ICourseShortInfo;
    positions: IPosition[];
}

type CourseFormValues = {
    courseId?: string;
    title: string;
    previewImageUrl: string;
    positionId: string;
}

export function SaveCourseForm(props: ISaveCourseFormProps) {
    const [saveCourse, { isSuccess }] = useSaveCourseMutation();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, reset, formState } = useForm<CourseFormValues>({
        defaultValues: {
            courseId: props.course?.id,
            title: props.course?.title,
            positionId: props.course?.position.id,
            previewImageUrl: props.course?.previewImageUrl
        }
    });

    const onSubmit = async (data: CourseFormValues) => {
        console.log(data);
        const course = await saveCourse({ ...data }).unwrap();
        reset(undefined, { keepValues: true });
        if (!props.course)
            navigate(`/courses/${course.id}/edit`);
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ width: '100%', gap: 4, flexDirection: 'row', justifyContent: 'start' }}>
            <Card variant='elevation' sx={{ minWidth: 440, height: 240 }}>
                <CardMedia
                    component="img"
                    width={440}
                    height={240}
                    sx={{ width: 440 }}
                    image={watch('previewImageUrl')}
                    alt="preview"
                />
            </Card>
            <Stack alignItems='start' justifyContent='space-between'>
                <Grid container justifyContent='start' gap={3}>
                    <Stack direction='row' gap={3}>
                        <TextField label='Название' required {...register('title')} />
                        <TextField
                            select label="Должность"
                            defaultValue={props.course?.position.id ?? props.positions[0].id}
                            {...register('positionId')}>
                            {props?.positions.map(p => <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>)}
                        </TextField>
                    </Stack>
                    <TextField label='Ссылка на картинку' {...register('previewImageUrl')} />
                </Grid>
                <Stack direction='row' alignItems='end' gap={3}>
                    <Button disabled={!formState.isDirty || !formState.isValid} variant='contained'
                            type='submit'>{props.course ? 'Сохранить' : 'Создать'}</Button>
                </Stack>
            </Stack>
        </FormControl>
    </form>;
}