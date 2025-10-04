import { httpClient } from "@/lib/api/client";
import { PaginatedList } from "@/types/pagination";





const currentUser = async (): Promise<any> => {
    const response = await httpClient.get('users/current');

    return response.data;
}


const getList = async (page: number=1, size: number=10, orderBy?: string, sortBy?: 'asc' | 'desc', search?: string, withDeleted = false): Promise<PaginatedList<any>> => {

    const params = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: size.toString(),
        ...(orderBy && {orderBy: orderBy}),
        ...(sortBy && {sortBy: sortBy})
    });

    if (search) {
        params.append("search", search);
    }
    if(withDeleted) {
        params.append("withDeleted", withDeleted.toString());
    }

    const response = await httpClient.get("/users", {params: params});

    return response.data;
}



const get = async (id: number): Promise<any> => {
    const response = await httpClient.get(`/users/${id}`);
    return response.data;
}


export const userService = {
    currentUser,
    getList,
    get
}