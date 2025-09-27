'use client';

import { useEffect, useState, useTransition } from "react";
import { DataTable } from "@/components/tables/data-table";
import { classColumns } from "@/app/(dashboard)/classes/columns";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { getClassList } from "@/services/class.service";
import { Pagination, Sorting } from "@/lib/constants/pagination";




const ClassesPage = () => {
    const [isPending, startTransition] = useTransition();
    const [data, setData] = useState<unknown[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        pageNumber:1, pageSize:10, totalCount:0, totalPage:0
    });
    const [sorting, setSorting] = useState<Sorting>({});
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);



    useEffect(() => {

        startTransition(async () =>{
            const result = await getClassList(pagination.pageNumber, pagination.pageSize, sorting.orderBy, sorting.sortBy, debouncedSearchQuery);
            console.log(result);
            setData(result.items);

            setPagination({
                pageNumber: pagination.pageNumber,
                pageSize: result.pageSize,
                totalPage: result.totalPage,
                totalCount: result.totalCount
            });
        })

    }, [pagination.pageNumber, pagination.pageSize, sorting.sortBy, sorting.orderBy, debouncedSearchQuery]);


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
                loading={isPending}
                pagination={{
                    pageNumber: pagination.pageNumber - 1, // TanStack uses 0-based indexing
                    pageSize: pagination.pageSize,
                    totalPage: pagination.totalPage,
                    totalCount: pagination.totalCount,
                }}
                onPaginationChange={({pageNumber, pageSize}) => {
                    if (pageSize !== pagination.pageSize) {
                        handlePageSizeChange(pageSize);
                    } else if (pageNumber + 1 !== pagination.pageNumber) {
                        handlePageChange(pageNumber + 1);
                    }
                }}
                onSortingChange={handleSortingChange}
            />

        </div>
    )


}


export default ClassesPage;





















