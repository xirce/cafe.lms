import { Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Stack } from '@mui/material';
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { ICourseShortInfo } from "../../types";
import { getCountDeclination } from "../../utils/formatting";
import { CircularProgressWithLabel } from "../Common/Progress/CircularProgressWithLabel";

interface ICourseCardProps {
    course: ICourseShortInfo;
}

export function CourseCard({ course }: ICourseCardProps) {
    return (
        <Card>
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
                        </Stack>
                        <Stack direction='row' justifyContent='space-between' alignItems='end'>
                            <Chip label={course.position.title} size='small' />
                            <CircularProgressWithLabel color='success' value={100 * (course.progress?.unitsDoneCount ?? 0) / course.unitsCount} />
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>

    )
        ;
}