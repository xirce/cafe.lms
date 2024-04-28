import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import {
    IChangeUserRequest,
    ICourseInfo,
    ICoursesResponse,
    IGetCourseRequest,
    ILecture,
    IPositionsResponse,
    IQuiz,
    IQuizAttempt,
    ISaveCourseRequest,
    ISaveCourseResponse,
    ISubmitQuizRequest,
    ISubmitQuizResponse,
    IUserInfo
} from "../types";

export const instance = axios.create({
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
});

instance.interceptors.response.use(r => r, (e: AxiosError) => {
    if (e.response?.status === 401)
        window.location.href = `http://localhost:5270/authorize/login?backUrl=${window.location.href}`;
    return e;
});

export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<{
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
}> => async ({ url, method, data, params }) => {
    try {
        const result = await instance.request({ url: baseUrl + url, method, data, params })
        return { data: result.data }
    } catch (axiosError) {
        let err = axiosError as AxiosError
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        }
    }
}


enum Tag {
    Course = 'Course',
    Unit = 'Unit',
    QuizAttempt = 'QuizAttempt'
}


const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5270/api' }),
    keepUnusedDataFor: 30,
    tagTypes: [Tag.Course, Tag.Unit, Tag.QuizAttempt],
    endpoints: (build) => ({
        getUser: build.query<IUserInfo, string | void>({
            query: (userId) => ({ url: '/users' + (userId ? `/${userId}` : ''), method: 'GET' }),
            keepUnusedDataFor: 10
        }),
        changeUser: build.mutation<void, IChangeUserRequest>({
            query: (request) => ({ url: '/users', method: 'POST', data: request }),
        }),
        getCourses: build.query<ICoursesResponse, string | void>({
            query: (userId) => ({ url: '/courses' + (userId ? `?userId=${userId}` : ''), method: 'GET' }),
        }),
        getCourse: build.query<ICourseInfo, IGetCourseRequest>({
            query: ({ courseId, userId }) => ({ url: `/courses/${courseId}?userId=${userId}`, method: 'GET' }),
            providesTags: (result, _) =>
                result
                    ? [...result.units.map(u => ({ type: Tag.Unit, id: u.id })), Tag.Course]
                    : [Tag.Course]
        }),
        getLecture: build.query<ILecture, string | void>({
            query: (unitId) => ({ url: `/lectures/${unitId}`, method: 'GET' }),
        }),
        getQuizAttempt: build.query<IQuizAttempt | null, string | void>({
            query: (unitId) => ({ url: `/quiz/${unitId}/attempt`, method: 'GET' }),
            providesTags: (result, _) =>
                result ? [{ type: Tag.QuizAttempt, id: result.quizId }] : []
        }),
        getQuiz: build.query<IQuiz, string | void>({
            query: (unitId) => ({ url: `/quiz/${unitId}`, method: 'GET' }),
        }),
        submitQuiz: build.mutation<ISubmitQuizResponse, ISubmitQuizRequest>({
            query: (request) => ({ url: `/quiz/${request.quizId}/submit`, method: 'POST', data: request }),
            invalidatesTags: (result) => [{ type: Tag.QuizAttempt, id: result?.quizId }, Tag.QuizAttempt],
        }),
        getPositions: build.query<IPositionsResponse, void>({
            query: () => ({ url: '/positions', method: 'GET' }),
        }),
        saveCourse: build.mutation<ISaveCourseResponse, ISaveCourseRequest>({
            query: (request) => ({ url: '/courses', method: 'POST', data: request }),
            invalidatesTags: (result) => [{ type: Tag.Course, id: result?.id }],
        }),
    })
});

export const {
    useGetUserQuery,
    useGetCoursesQuery,
    useGetCourseQuery,
    useGetLectureQuery,
    useGetQuizAttemptQuery,
    useGetQuizQuery,
    useGetPositionsQuery,
    useSubmitQuizMutation,
    useChangeUserMutation,
    useSaveCourseMutation,
} = api;

export default api;