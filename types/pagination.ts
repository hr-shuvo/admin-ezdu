export interface PaginatedList<T> {
    currentPage: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
    items: T[];
}