import { PaginatedList } from "@/types/pagination";
import { httpClient } from "@/lib/api/client";


const getList = async (page: number, size: number, orderBy?: string, sortBy?: 'asc' | 'desc', search?: string, withDeleted = false, subjectId?: number, lessonId?: number): Promise<PaginatedList<any>> => {

    const params = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: size.toString(),
        ...(orderBy && {orderBy: orderBy}),
        ...(sortBy && {sortBy: sortBy}),
        ...(subjectId && {subjectId: subjectId.toString()}),
        ...(lessonId && {lessonId: lessonId.toString()})
    });

    if (search) {
        params.append("search", search);
    }
    if (withDeleted) {
        params.append("withDeleted", withDeleted.toString());
    }

    const response = await httpClient.get("/topics", {params: params});

    return response.data;
}

const save = async (model: any): Promise<any> => {
    const response = await httpClient.post(`/topics/save`, model);
    return response.data;
}

const get = async (id: number): Promise<any> => {
    const response = await httpClient.get(`/topics/${id}`);
    return response.data;
}

const remove = async (id: number): Promise<any> => {
    // try {
    //
    // } catch (error) {
    //
    //     return null;
    // }
    const response = await httpClient.delete(`/topics/delete/${id}`);
    return response.data;
}

const permanentDelete = async (id: number): Promise<any> => {
    const response = await httpClient.delete(`/topics/permanent-delete/${id}`);
    return response.data;
}

const restore = async (id: number): Promise<any> => {
    const response = await httpClient.patch(`/topics/restore/${id}`);
    return response.data;
}


export const topicService = {
    getList,
    get,
    save,
    delete: remove,
    permanentDelete,
    restore,
}