import { PaginatedList } from "@/types/pagination";
import { httpClient } from "@/lib/api/client";


const getList = async (page: number, size: number, orderBy?: string, sortBy?: 'asc' | 'desc', search?: string, withDeleted = false, subjectId?:number): Promise<PaginatedList<any>> => {
    // console.log('subjectId in lesson service: ', subjectId);
    const params = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: size.toString(),
        ...(orderBy && {orderBy: orderBy}),
        ...(sortBy && {sortBy: sortBy}),
        ...(withDeleted && {withDeleted: withDeleted.toString()}),
        ...(subjectId && {subjectId: subjectId.toString()}),
    });

    if (search) {
        params.append("search", search);
    }

    const response = await httpClient.get("/lessons", {params: params});

    return response.data;
}

const save = async (model: any): Promise<any> => {
    const response = await httpClient.post(`/lessons/save`, model);
    return response.data;
}

const get = async (id: number): Promise<any> => {
    const response = await httpClient.get(`/lessons/${id}`);
    return response.data;
}

const remove = async (id: number): Promise<any> => {
    // try {
    //
    // } catch (error) {
    //
    //     return null;
    // }
    const response = await httpClient.delete(`/lessons/delete/${id}`);
    return response.data;
}

const permanentDelete = async (id: number): Promise<any> => {
    const response = await httpClient.delete(`/lessons/permanent-delete/${id}`);
    return response.data;
}

const restore = async (id: number): Promise<any> => {
    const response = await httpClient.patch(`/lessons/restore/${id}`);
    return response.data;
}


export const lessonService = {
    getList,
    get,
    save,
    delete: remove,
    permanentDelete,
    restore,
}