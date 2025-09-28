import { PaginatedList } from "@/types/pagination";
import { httpClient } from "@/lib/api/client";


export const getClassList = async (page: number, size: number, orderBy?: string, sortBy?: 'asc' | 'desc', search?: string): Promise<PaginatedList<any>> => {

    const params = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: size.toString(),
        ...(orderBy && {orderBy: orderBy}),
        ...(sortBy && {sortBy: sortBy}),
    });

    if (search) {
        params.append("search", search);
    }

    const response = await httpClient.get("/classes", {params: params});

    return response.data;
}

export const saveClass = async (model: any): Promise<any> => {
    const response = await httpClient.post(`/classes/save`, model);
    return response.data;
}

export const getClass = async (id: number): Promise<any> => {
    const response = await httpClient.get(`/classes/${id}`);
    return response.data;
}

export const deleteClass = async (id: number): Promise<any> => {
    // try {
    //
    // } catch (error) {
    //
    //     return null;
    // }
    const response = await httpClient.delete(`/classes/delete/${id}`);
    return response.data;
}

export const permanentDelete = async (id: number): Promise<any> => {
    const response = await httpClient.delete(`/classes/permanent-delete/${id}`);
    return response.data;
}