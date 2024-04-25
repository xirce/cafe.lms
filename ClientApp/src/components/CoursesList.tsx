import { CourseCard } from "./Course/CourseCard";
import { Grid } from "@mui/material";
import React from "react";

export function CoursesList() {
    return <Grid container justifyContent='start' gap={6}>
        <CourseCard id={'course1'} title={'Курс 123'} unitsCount={4} />
        <CourseCard id={'course1'} title={'Курс 123'} unitsCount={4} />
        <CourseCard id={'course1'} title={'Курс 123'} unitsCount={4} />
        <CourseCard id={'course1'} title={'Курс 123'} unitsCount={4} />
        <CourseCard id={'course1'} title={'Курс 123'} unitsCount={4} />
        <CourseCard id={'course1'} title={'Курс 123'} unitsCount={4} />
        <CourseCard id={'course1'} title={'Курс 123'} unitsCount={4} />
        <CourseCard id={'course1'} title={'Курс 123'} unitsCount={4} />
    </Grid>;
}