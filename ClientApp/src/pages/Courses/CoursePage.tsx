import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CourseSideBar } from "../../components/Course/CourseSideBar";
import { useGetCourseQuery } from "../../api/apiClient";
import { useAppAction } from "../../app/hooks";
import { UserUnitStatus } from "../../types";

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
        if (course && !unitId) {
            const defaultUnitId = course.units.find(u => !u.progress || u.progress.status === UserUnitStatus.InProgress)?.id || course.units.at(-1)!.id;
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

    if (isFetching)
        return null;

    return <Box sx={{ display: 'flex' }}>
        <CourseSideBar course={course!} />
        <Outlet />
    </Box>
};

export default CoursePage;