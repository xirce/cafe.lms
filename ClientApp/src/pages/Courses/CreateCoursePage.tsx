import { useForm } from "react-hook-form";
import { Box, Button, FormControl, MenuItem, Paper, Stack, TextField } from "@mui/material";
import { useGetPositionsQuery, useSaveCourseMutation } from "../../api/apiClient";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import React from "react";

type CourseFormValues = {
    title: string;
    previewImageUrl: string;
    positionId: string;
}

export function CreateCoursePage() {
    const [saveCourse] = useSaveCourseMutation();
    const { data } = useGetPositionsQuery();
    const { register, handleSubmit } = useForm<CourseFormValues>();

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
                <Paper variant='elevation' sx={{ minWidth: 440, height: 240 }}>
                    {undefined}
                </Paper>
                <Stack alignItems='start' justifyContent='space-between'>
                    <Stack gap={2} width='100%'>
                        <TextField label='Название' required {...register('title',)} />
                        <TextField select label="Должность"
                                   defaultValue={data?.positions[0].id}  {...register('positionId')}>
                            {data?.positions.map(p => <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>)}
                        </TextField>
                    </Stack>
                    <Stack>
                        <Button variant='contained' type='submit'>Создать</Button>
                    </Stack>
                </Stack>
            </FormControl>
        </form>
    </Box>
        ;
}