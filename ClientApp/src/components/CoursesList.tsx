import { CourseCard } from "./Course/CourseCard";
import { Grid } from "@mui/material";
import React from "react";
import { ICourseShortInfo } from "../types";


interface ICoursesListProps {
    courses: ICourseShortInfo[];
    editable?: boolean;
    userId?: string;
}

export function CoursesList({ courses, editable, userId }: ICoursesListProps) {
    return <Grid container justifyContent='start' spacing={2}>
        {
            courses.map(c => <Grid item key={c.id} sm={6} md={4}>
                <CourseCard course={c} editable={editable} userId={userId} />
            </Grid>)
        }
    </Grid>;
}