import { PaginatedList } from "@/types/pagination";
import { httpClient } from "@/lib/api/client";


export const getClassList = async (page: number, size: number, orderBy?: string, sortBy?: 'asc' | 'desc', search?: string): Promise<PaginatedList<any>> => {

    try {
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
    } catch (error) {
        console.error('service: ', error);
        return {} as PaginatedList<any>;
    }
}