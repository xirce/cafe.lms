import { Card, CardActionArea, CardContent, CardMedia, Chip, FormLabel, Grid, Stack } from '@mui/material';
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface ICourseCardProps {
    id: string;
    title: string;
    imageUrl?: string;
    unitsCount: number;
}

export function CourseCard(props: ICourseCardProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Link to={`courses/${props.id}`}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.imageUrl ?? "https://sun1-97.userapi.com/impg/Iq1HF-6JT_U0ME9MKZFlbvbXa0daaCcQc5QNxQ/YI-jebv4Ka8.jpg?size=1200x800&quality=96&sign=2153a2c502ca19f02bc6b32aa83ff4b3&c_uniq_tag=j7bi6AQX7LiI7C50OKggAhZONb5EqGj4bcx9KqttVkE&type=album"}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Stack direction='row' justifyContent='space-between' alignItems='center' pb={1}>
                            <Typography fontWeight={'bold'} variant="h6">
                                Курс
                            </Typography>
                            <Typography>
                                {props.unitsCount} Темы
                            </Typography>
                        </Stack>
                        <Chip label="Бариста" size='small' />
                    </CardContent>
                </CardActionArea>

            </Link>
        </Card>

    );
}