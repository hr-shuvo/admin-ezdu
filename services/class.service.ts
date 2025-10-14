import { PaginatedList } from "@/types/pagination";
import { httpClient } from "@/lib/api/client";


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

    const response = await httpClient.get("/classes", {params: params});

    return response.data;
}

const save = async (model: any): Promise<any> => {
    const response = await httpClient.post(`/classes/save`, model);
    return response.data;
}

const get = async (id: number): Promise<any> => {
    const response = await httpClient.get(`/classes/${id}`);
    return response.data;
}

const remove = async (id: number): Promise<any> => {
    // try {
    //
    // } catch (error) {
    //
    //     return null;
    // }
    const response = await httpClient.delete(`/classes/delete/${id}`);
    return response.data;
}

const permanentDelete = async (id: number): Promise<any> => {
    const response = await httpClient.delete(`/classes/permanent-delete/${id}`);
    return response.data;
}

const restore = async (id: number): Promise<any> => {
    const response = await httpClient.patch(`/classes/restore/${id}`);
    return response.data;
}


const getSelectList = async (page: number, limit: number, search?: string | undefined): Promise<any> => {

    try {
        const result = await classService.getList(page, limit, undefined, undefined, search);
        // console.log('classes: ', result.items);
        // setClasses(result.items);

        return {items: result.items, total: result.totalCount};

    } catch (error) {
        console.log(error);
    }
};


export const classService = {
    getList,
    get,
    save,
    delete: remove,
    permanentDelete,
    restore,
    getSelectList
}