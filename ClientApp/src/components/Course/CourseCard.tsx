import { Card, CardActionArea, CardContent, CardMedia, Chip, IconButton, Stack } from '@mui/material';
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import React from "react";
import { ICourseShortInfo } from "../../types";
import { CircularProgressWithLabel } from "../Common/Progress/CircularProgressWithLabel";
import Box from "@mui/material/Box";
import { EditTwoTone } from "@mui/icons-material";

interface ICourseCardProps {
    course: ICourseShortInfo;
    editable?: boolean;
}

export function CourseCard({ course, editable }: ICourseCardProps) {
    return (
        <Card>
            <Link to={`/courses/${course.id}`}>
                <CardActionArea>
                    {
                        editable
                            ? <Link to={`/courses/${course.id}/edit`}>
                                <Box sx={{ position: 'absolute', top: 4, right: 4 }}>
                                    <IconButton
                                        disableRipple
                                        sx={(theme) => ({
                                            backgroundColor: 'white',
                                            borderRadius: 1,
                                            opacity: theme.palette.text.primary,
                                            '.MuiCard-root:not(:hover) &': {
                                                display: 'none'
                                            },
                                            '&:hover': {
                                                opacity: 0.9
                                            }
                                        })}>
                                        <EditTwoTone htmlColor='text.primary' />
                                    </IconButton>
                                </Box>
                            </Link>
                            : null
                    }

                    <CardMedia
                        component="img"
                        height="140"
                        image={course.previewImageUrl}
                        alt="preview"
                    />
                    <CardContent>
                        <Stack direction='row' justifyContent='space-between'>
                            <Stack direction='column' justifyContent='space-between' alignItems='start' gap={1}>
                                <Typography variant='h6' fontWeight={'bold'}>
                                    {course.title}
                                </Typography>
                                <Chip label={course.position.title} size='small' />
                            </Stack>
                            <Stack direction='column' justifyContent='end' alignItems='end'>
                                <CircularProgressWithLabel
                                    color='success'
                                    value={100 * (course.progress?.unitsDoneCount ?? 0) / course.unitsCount} />
                            </Stack>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>

    )
        ;
}