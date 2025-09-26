'use client';

import { useCallback, useEffect, useState } from "react";
import { PaginatedList } from "@/types/pagination";
import { DataTable } from "@/app/(dashboard)/classes/data-table";
import { classColumns } from "@/app/(dashboard)/classes/columns";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";


const fetchClasses = async (page: number, pageSize: number, sortBy?: string, orderBy?: string, search?: string): Promise<PaginatedList<unknown>> => {

    // console.log(page, pageSize, sortBy, orderBy, search);
    const params = new URLSearchParams({
        PageNumber: page.toString(),
        pageSize: pageSize.toString(),
        ...(sortBy && {sortBy: sortBy}),
        ...(orderBy && {orderBy: orderBy}),
        ...(search && {search: search}),
    });

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/classes?${params}`);

    return response.json();
}

const ClassesPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<unknown[]>([]);
    const [pagination, setPagination] = useState({
        pageNo: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
    });
    const [sorting, setSorting] = useState<{ orderBy?: string; sortBy?: 'asc' | 'desc'; }>({});
    const [searchQuery, setSearchQuery] = useState('');

    const debouncedSearchQuery = useDebounce(searchQuery, 300);


    const loadData = useCallback(async (page: number, pageSize: number, sortBy?: string, sortOrder?: string, search?: string) => {
        setLoading(true);

        try {
            const result = await fetchClasses(page, pageSize, sortBy, sortOrder, search);
            setData(result.items);

            // console.log('data: ', result.items);
            setPagination({
                pageNo: page,
                pageSize: result.pageSize,
                totalPage: result.totalPage,
                totalCount: result.totalCount
            })

        } catch (error) {
            console.error('Error fetching classes:', error);

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {

        loadData(pagination.pageNo, pagination.pageSize, sorting.sortBy, sorting.orderBy, debouncedSearchQuery);

        // console.log(pagination)
    }, [pagination.pageNo, pagination.pageSize, sorting.sortBy, sorting.orderBy, debouncedSearchQuery]);


    const handlePageChange = (newPageNo: number) => {
        setPagination(prev => ({...prev, pageNo: newPageNo}));
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPagination(prev => ({...prev, pageSize: newPageSize, pageNo: 1}));
    };

    const handleSortingChange = (orderBy?: string, sortBy?: 'asc' | 'desc') => {
        setSorting({orderBy, sortBy});
        setPagination(prev => ({...prev, pageNo: 1})); // Reset to first page when sorting changes
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setPagination(prev => ({...prev, pageNo: 1})); // Reset to first page when searching
    };


    return (
        <div className=''>
            <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
                <h1 className='font-semibold'>All Class</h1>
            </div>

            <div className='mb-4'>
                <Input
                    placeholder="Search classes..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <DataTable
                columns={classColumns}
                data={data}
                loading={loading}
                pagination={{
                    pageNumber: pagination.pageNo - 1, // TanStack uses 0-based indexing
                    pageSize: pagination.pageSize,
                    totalPage: pagination.totalPage,
                    totalCount: pagination.totalCount,
                }}
                onPaginationChange={({pageNumber, pageSize}) => {
                    if (pageSize !== pagination.pageSize) {
                        handlePageSizeChange(pageSize);
                    } else if (pageNumber + 1 !== pagination.pageNo) {
                        handlePageChange(pageNumber + 1);
                    }
                }}
                onSortingChange={handleSortingChange}
            />

        </div>
    )


}


export default ClassesPage;





















