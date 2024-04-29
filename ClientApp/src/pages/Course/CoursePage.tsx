import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CourseSideBar } from "../../components/Course/CourseSideBar";
import { useGetCourseQuery } from "../../api/apiClient";
import { useAppAction } from "../../app/hooks";
import { UserUnitStatus } from "../../types";
import { Typography } from '@mui/material';

const CoursePage = () => {
    const { courseId, unitId } = useParams();
    const { data: course, isFetching } = useGetCourseQuery({ courseId: courseId! });
    const { setCourse, setCurrentUnit } = useAppAction();
    const navigate = useNavigate();

    useEffect(() => {
        return function () {
            setCourse(undefined);
            setCurrentUnit(undefined);
        }
    }, []);

    useEffect(() => {
        if (course && !unitId && course.unitsCount > 0) {
            const defaultUnitId = course.units.slice()
                .sort((a, b) => a.order - b.order)
                .find(u => !u.progress || u.progress.status === UserUnitStatus.InProgress)?.id || course.units.at(-1)!.id;
            navigate(`unit/${defaultUnitId}`, { replace: true });
        }
        if (unitId)
            setCurrentUnit(unitId);
    }, [course, unitId]);

    useEffect(() => {
        if (course) {
            setCourse(course);
        }
    }, [course]);

    if (!course)
        return null;

    return <Box sx={{ display: 'flex' }}>
        {
            course.unitsCount > 0
                ? <>
                    <CourseSideBar course={course} />
                    <Outlet />
                </>
                : <Typography variant='h5' mx='auto' mt={8}>
                    В курсе <Typography variant='h5' display="inline" fontWeight='bold' sx={{textDecoration: 'underline'}}>{course.title}</Typography> ещё ничего нет
                </Typography>
        }
    </Box>
};

export default CoursePage;