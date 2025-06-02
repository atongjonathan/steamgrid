import axios from "axios"
import { getTokenFromCookies } from "./components/context/AuthContext"


const API_BASE = import.meta.env.VITE_API_BASE
const api = axios.create(
    {
        baseURL: API_BASE
    }
)
export type MinMovie = {
    id: number;
    poster: string;
    title: string;
    year: number;
    rating_star: number;
};

export type ResponseUser = {
    id: number;
    favourites: MinMovie[];
    plan: MinMovie[];
    dropped: MinMovie[];
    finished: MinMovie[];
    downloaded: MinMovie[];
    hold: MinMovie[];
    last_login: string; // ISO datetime string
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string; // ISO datetime string
    email: string;
    image?: string;
    name: string | null;
    telegram_id: number;
    is_verified: boolean;
    groups: any[]; // adjust if groups have a structure
    user_permissions: any[]; // adjust if permissions have a structure
};

export type User = ResponseUser & {
    image: string

}

export type BannerMovie = {
    poster: string;
    title: string;
    id: number;
    plot: string;
    genre: string[];
    year: number;
    runtime: string;
};

export type Pagination = {
    count: number;
    next: number | null;
    previous: number | null;
};

export type TrendingResponse = Pagination & {
    results: BannerMovie[];
};



export type UserUpdatePayload = Partial<Record<"plan_ids" | "hold_ids" | "dropped_ids" | "finished_ids", number[]>>

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

export async function getTrending() {
    const url = `${API_BASE}/trending`;
    return (await api.get(url)).data as TrendingResponse
}

export const updateUser = async (data: UserUpdatePayload & { image?: string }) => {
    delete data.image
    return (await api.put(`/users/me/`, data)).data as ResponseUser
};