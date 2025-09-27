export type Pagination = {
    pageNumber: number,
    pageSize: number,
    totalCount: number,
    totalPage: number
}

export type Sorting = {
    orderBy?: string;
    sortBy?: 'asc' | 'desc';
}