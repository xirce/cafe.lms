import { Box, Card, CardMedia, Chip, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../../api/apiClient";
import React from "react";
import { CircularProgressWithLabel } from "../../components/Common/Progress/CircularProgressWithLabel";
import { UnitsList } from "../../components/UnitsList";

export function CourseOverviewPage() {
    const { courseId, userId } = useParams();
    const { data: course } = useGetCourseQuery({ courseId: courseId!, userId });

    if (!course)
        return null;

    return <>
        <Stack mb={5} pb={1} borderBottom={1} borderColor={'divider'}>
            <Typography variant='h4'>Курс</Typography>
        </Stack>
        <Stack direction='row' gap={4} pb={5}>
            <Card variant='elevation' sx={{ width: 440 }}>
                <CardMedia
                    component="img"
                    width={440}
                    height={240}
                    image={course.previewImageUrl}
                    alt="preview"
                />
            </Card>
            <Stack direction='row' alignItems='start' justifyContent='start' gap={4}>
                <Stack justifyContent='start' alignItems='start' gap={1}>
                    <Typography variant='h4' fontWeight='bold'>
                        {course.title}
                    </Typography>
                    <Chip label={course.position.title} />
                </Stack>
                {
                    course.progress ? <Stack direction='row' alignItems='center' gap={1}>
                        <Paper sx={{ p: 1 }}>
                            <Stack direction='row' justifyContent='space-between' mb={2}>
                                <Typography variant='h6'>Прогресс</Typography>
                                <CircularProgressWithLabel
                                    color='success'
                                    value={100 * course.progress.unitsDoneCount / course.unitsCount} />
                            </Stack>
                            <Typography>
                                <b>{course.progress.unitsDoneCount}/{course.unitsCount}</b> тем пройдено
                            </Typography>
                        </Paper>
                    </Stack> : null
                }
            </Stack>
        </Stack>
        {
            course.units.length > 0 ? <Box borderTop={1} borderColor='divider' pt={5}>
                <Typography variant='h5' mb={2}>Содержание</Typography>
                <UnitsList showProgress={true} courseId={course.id} units={course.units} />
            </Box> : null
        }

    </>;
}