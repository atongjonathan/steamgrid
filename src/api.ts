import axios from "axios"
import { getTokenFromCookies } from "./components/context/AuthContext"


const API_BASE = import.meta.env.VITE_API_BASE
const api = axios.create(
    {
        baseURL: API_BASE
    }
)

export interface ResponseUser {
    image?: string,
    username: string,
    name?: string
    is_superuser:boolean
}

export type User = ResponseUser & {
    image: string

}
api.interceptors.request.use(
    (config) => {
        const token = getTokenFromCookies()
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
)



export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data
        if (data) {
            // Axios error with server response
            if (typeof data.message === 'string') {
                return data.message;
            }
            if (typeof data.error === 'string') {
                return data.error;
            }
            else if (typeof data.detail === 'string') {
                return data.detail;
            }
            else if (data.label) {
                let error = (data.label as string[]).join(", ")
                return error
            }
            else
                return 'An unknown error occurred.';

        }

        // Axios error with no response (e.g., network error)
        return error.message || 'An unexpected error occurred.';
    }

    // Non-Axios errors
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unknown error occurred.';
}
export async function signUp(data: {
    email: string;
    username: string;
    password: string;
}) {
    const signUpUrl = `${API_BASE}/create-user`;
    return (await api.post(signUpUrl, data)).data;

}

export async function login(data: {
    username: string;
    password: string;
}) {
    const url = `${API_BASE}/token/`;
    return (await api.post(url, data)).data as { access: string, refresh: string };

}

export async function getUser() {
    const url = `${API_BASE}/users/me/`;
    return (await api.get(url)).data as ResponseUser
}