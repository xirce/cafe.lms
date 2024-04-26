import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CourseSideBar } from "../../components/Course/CourseSideBar";
import { useGetCourseQuery } from "../../api/apiClient";
import { useAppAction, useAppSelector } from "../../app/hooks";
import { getCourse } from "../../app/course";
import { UserUnitStatus } from "../../types";

const CoursePage = () => {
    const { courseId, unitId } = useParams();
    const { data, isFetching } = useGetCourseQuery({ courseId: courseId! });
    const course = useAppSelector(getCourse);
    const { setCourse, setCurrentUnit } = useAppAction();
    const navigate = useNavigate();

    useEffect(() => {
        return function () {
            setCourse(undefined);
            setCurrentUnit(undefined);
        }
    }, []);

    if (isFetching)
        return null;

    if (!course && data) {
        setCourse(data);
    }

    if (course && !unitId) {
        const defaultUnitId = course.units.find(u => !u.progress || u.progress.status === UserUnitStatus.InProgress)?.id || course.units.at(-1)!.id;
        navigate(`unit/${defaultUnitId}`, { replace: true });
    }

    return <Box sx={{ display: 'flex' }}>
        <CourseSideBar course={data!} />
        <Outlet />
    </Box>
};

export default CoursePage;