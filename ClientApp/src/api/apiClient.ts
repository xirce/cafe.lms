import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query";

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

const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5270/api' }),
    keepUnusedDataFor: 30,
    endpoints: (build) => ({})
});

export default api;