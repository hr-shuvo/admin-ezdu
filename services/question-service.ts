import { PaginatedList } from "@/types/pagination";
import { httpClient } from "@/lib/api/client";


const getList = async (page: number = 1, size: number = 10, orderBy?: string, sortBy?: 'asc' | 'desc', search?: string, withDeleted = false, subjectId?: number, lessonId?: number, topicId?: number): Promise<PaginatedList<any>> => {

    const params = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: size.toString(),
        ...(orderBy && {orderBy: orderBy}),
        ...(sortBy && {sortBy: sortBy}),
        ...(subjectId && {subjectId: subjectId.toString()}),
        ...(lessonId && {lessonId: lessonId.toString()}),
        ...(topicId && {topicId: topicId.toString()}),
    });

    if (search) {
        params.append("search", search);
    }
    if (withDeleted) {
        params.append("withDeleted", withDeleted.toString());
    }

    const response = await httpClient.get("/questions", {params: params});

    return response.data;
}

const save = async (model: any): Promise<any> => {
    const response = await httpClient.post(`/questions/save`, model);
    return response.data;
}


const get = async (id: number): Promise<any> => {
    const response = await httpClient.get(`/questions/${id}`);
    return response.data;
}


export const questionService = {
    getList,
    save,
    get
}