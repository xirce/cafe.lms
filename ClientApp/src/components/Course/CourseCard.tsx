import {
    Box,
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

interface ICourseCardProps {
    id: string;
    title: string;
    imageUrl?: string;
    unitsCount: number;
}

export function CourseCard(props: ICourseCardProps) {
    return (
        <Card sx={{ width: 344 }}>
            <Link to={`/courses/${props.id}`}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.imageUrl ?? "https://sun1-97.userapi.com/impg/Iq1HF-6JT_U0ME9MKZFlbvbXa0daaCcQc5QNxQ/YI-jebv4Ka8.jpg?size=1200x800&quality=96&sign=2153a2c502ca19f02bc6b32aa83ff4b3&c_uniq_tag=j7bi6AQX7LiI7C50OKggAhZONb5EqGj4bcx9KqttVkE&type=album"}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Stack direction='row' justifyContent='space-between' alignItems='baseline' mb={1}>
                            <Typography variant='h6' fontWeight={'bold'}>
                                Самый лучший курс
                            </Typography>
                            <Typography noWrap overflow='initial'>
                                {props.unitsCount} Темы
                            </Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between' alignItems='end'>
                            <Chip label="Бариста" size='small' />
                            <Stack direction='column' justifyContent='start' alignItems='end'>
                                <LinearProgress
                                    variant="determinate"
                                    value={50}
                                    color={'success'}
                                    sx={{width: '100%'}}
                                />
                                <Typography fontSize='small'>Завершен на 50%</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>

    );
}