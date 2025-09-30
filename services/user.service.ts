import { httpClient } from "@/lib/api/client";





const currentUser = async (): Promise<any> => {
    const response = await httpClient.get('users/current');

    return response.data;
}


export const userService = {
    currentUser
}