import { useForm } from "react-hook-form";
import { Box, Button, Card, CardMedia, FormControl, Grid, MenuItem, Paper, Stack, TextField } from "@mui/material";
import { useGetPositionsQuery, useSaveCourseMutation } from "../../api/apiClient";
import Typography from "@mui/material/Typography";
import React from "react";

type CourseFormValues = {
    title: string;
    previewImageUrl: string;
    positionId: string;
}

export function CreateCoursePage() {
    const [saveCourse] = useSaveCourseMutation();
    const { data } = useGetPositionsQuery();
    const { register, handleSubmit, watch, getValues } = useForm<CourseFormValues>();

    console.log(getValues());

    const onSubmit = async (data: CourseFormValues) => {
        console.log(data);
        await saveCourse({ ...data });
    };

    return <Box>
        <Stack direction='row' justifyContent='space-between' mb={3}>
            <Typography variant='h4'>Создание курса</Typography>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ width: '100%', gap: 4, flexDirection: 'row', justifyContent: 'start' }}>
                <Card variant='elevation' sx={{ minWidth: 440, height: 240 }}>
                    <CardMedia
                        component="img"
                        width={440}
                        height={240}
                        image={watch('previewImageUrl')}
                        alt="preview"
                    />
                </Card>
                <Stack alignItems='start' justifyContent='space-between'>
                    <Grid container gap={2}>
                        <TextField label='Название' required {...register('title')} />
                        <TextField select label="Должность"
                                   defaultValue={data?.positions[0].id}  {...register('positionId')}>
                            {data?.positions.map(p => <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>)}
                        </TextField>
                        <TextField label='Ссылка на картинку' {...register('previewImageUrl')} />
                    </Grid>
                    <Stack>
                        <Button variant='contained' type='submit'>Создать</Button>
                    </Stack>
                </Stack>
            </FormControl>
        </form>
    </Box>
        ;
}