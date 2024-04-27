import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourseInfo } from "../types";
import { RootState } from "./store";

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
