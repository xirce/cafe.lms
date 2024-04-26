import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import api from "../api/apiClient";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        counter: counterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
