import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack
} from '@mui/material';
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
                                Самый лучший курс
                            </Typography>
                            <Typography noWrap overflow='initial'>
                                {course.unitsCount} {getCountDeclination(course.unitsCount, ['тема', 'темы', 'тем'])}
                            </Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between' alignItems='end'>
                            <Chip label={course.position.title} size='small' />
                            <Stack direction='column' justifyContent='start' alignItems='end'>
                                <LinearProgress
                                    variant="determinate"
                                    value={50}
                                    color={'success'}
                                    sx={{width: '100%'}}
                                />
                                {
                                    course.progress
                                    && <Typography fontSize='small'>Завершен на {course.progress?.unitsDoneCount / course.unitsCount}%</Typography>
                                }
                            </Stack>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>

    );
}