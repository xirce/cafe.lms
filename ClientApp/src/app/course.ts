import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourseInfo, IUnit } from "../types";
import { RootState } from "./store";
import api from "../api/apiClient";

export interface ICourseState {
    course?: ICourseInfo;
    currentUnitId?: string;
}

const initialCourseState: ICourseState = {
    course: undefined,
    currentUnitId: undefined,
}

export const courseSlice = createSlice({
    name: 'player',
    initialState: initialCourseState,
    reducers: {
        setCourse(state: ICourseState, action: PayloadAction<ICourseInfo | undefined>) {
            state.course = action.payload;
        },
        setCurrentUnit(state: ICourseState, action: PayloadAction<string | undefined>) {
            state.currentUnitId = action.payload;
        },
    }
});

export const getCourse = (state: RootState) => state.course.course;

export const getCurrentUnit = (state: RootState) => {
    return state.course.course?.units.find(u => u.id === state.course.currentUnitId);
};

export const getNextUnit = (state: RootState) => {
    if (!state.course.course)
        return null;

    const currentUnitIndex = state.course.course.units.findIndex(u => u.id === state.course.currentUnitId);
    if (currentUnitIndex === -1 || currentUnitIndex === state.course.course.unitsCount - 1)
        return null;

    return state.course.course.units.at(currentUnitIndex + 1);
};