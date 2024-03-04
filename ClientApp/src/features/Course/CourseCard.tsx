import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import Typography from "@mui/material/Typography";

export function CourseCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image="https://sun1-97.userapi.com/impg/Iq1HF-6JT_U0ME9MKZFlbvbXa0daaCcQc5QNxQ/YI-jebv4Ka8.jpg?size=1200x800&quality=96&sign=2153a2c502ca19f02bc6b32aa83ff4b3&c_uniq_tag=j7bi6AQX7LiI7C50OKggAhZONb5EqGj4bcx9KqttVkE&type=album"
                alt="green iguana"
            />
            <CardContent>
                <Typography fontWeight={'bold'} variant="h6" component="div">
                    Курс
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    );
}