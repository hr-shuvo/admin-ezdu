import * as z from 'zod';
import { LoginSchema } from "@/schemas/auth";
import { httpClient } from "@/lib/api/client";


const isLoggedIn = async (): Promise<boolean> => {
    const response = await httpClient.get('auth/is-logged-in');

    return response.data;
}


const login = async (values: z.infer<typeof LoginSchema>): Promise<any> => {
    const response = await httpClient.post('auth/login', values);

    localStorage.setItem("token", response.data?.token);

    return response.data;
}


const logout = async (): Promise<void> => {
    const response = await httpClient.get('auth/logout');

    return response.data;
}


export const authService = {
    isLoggedIn,
    login,
    logout
}