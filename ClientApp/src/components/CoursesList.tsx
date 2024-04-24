import { CourseCard } from "./Course/CourseCard";
import { Grid } from "@mui/material";
import React from "react";

export function CoursesList() {
    return <Grid container justifyContent='space-between'>
        <CourseCard id={'course1'} title={'Курс 123'} unitsCount={4} />
    </Grid>;
}