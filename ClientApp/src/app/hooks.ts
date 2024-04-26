import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { courseSlice } from "./course";
import { bindActionCreators } from "@reduxjs/toolkit";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppAction = () => {
    const dispatch = useAppDispatch();

    return bindActionCreators({
        ...courseSlice.actions
    }, dispatch);
}
