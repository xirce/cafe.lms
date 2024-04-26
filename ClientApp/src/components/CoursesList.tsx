import { CourseCard } from "./Course/CourseCard";
import { Grid } from "@mui/material";
import React from "react";
import { ICourseShortInfo } from "../types";


interface ICoursesListProps {
    courses: ICourseShortInfo[];
}

export function CoursesList({ courses }: ICoursesListProps) {
    return <Grid container justifyContent='start' gap={6}>
        {
            courses.map(c => <CourseCard key={c.id} course={c} />)
        }
    </Grid>;
}