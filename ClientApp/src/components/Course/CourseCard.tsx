import { Card, CardActionArea, CardContent, CardMedia, Chip, Stack } from '@mui/material';
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { ICourseShortInfo } from "../../types";
import { getCountDeclination } from "../../utils/formatting";

interface ICourseCardProps {
    course: ICourseShortInfo;
}

export function CourseCard({ course }: ICourseCardProps) {
    return (
        <Card sx={{ width: 312 }}>
            <Link to={`/courses/${course.id}`}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={course.previewImageUrl}
                        alt="preview"
                    />
                    <CardContent>
                        <Stack direction='row' justifyContent='space-between' alignItems='baseline' mb={1}>
                            <Typography variant='h6' fontWeight={'bold'}>
                                {course.title}
                            </Typography>
                            <Typography noWrap overflow='initial'>
                                {course.unitsCount} {getCountDeclination(course.unitsCount, ['тема', 'темы', 'тем'])}
                            </Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between' alignItems='end'>
                            <Chip label={course.position.title} size='small' />
                            <Stack direction='column' justifyContent='start' alignItems='end'>
                                {

                                    course.progress ?
                                        <>
                                            <LinearProgress
                                                variant="determinate"
                                                value={100 * course.progress?.unitsDoneCount / course.unitsCount}
                                                color={'success'}
                                                sx={{ width: '100%' }}
                                            />
                                            <Typography fontSize='small'>Завершен
                                                на {100 * course.progress?.unitsDoneCount / course.unitsCount}%</Typography>
                                        </> : null
                                }
                            </Stack>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>

    )
        ;
}