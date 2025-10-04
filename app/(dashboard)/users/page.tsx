'use client';

import { useEffect, useState, useTransition } from "react";
import { DataTable } from "@/components/tables/data-table";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Pagination, Sorting } from "@/lib/constants/pagination";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { userService } from "@/services/user.service";
import { userColumns } from "@/app/(dashboard)/users/columns";


const ClassesPage = () => {
    const [isPending, startTransition] = useTransition();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [data, setData] = useState<unknown[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        pageNumber: 1, pageSize: 10, totalCount: 0, totalPage: 0
    });
    const [sorting, setSorting] = useState<Sorting>({});
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [withDeleted, setWithDeleted] = useState<boolean>(false);
    const debouncedWithDeleted = useDebounce(withDeleted, 500);


    useEffect(() => {
        startTransition(async () => {
            const result = await userService.getList(pagination.pageNumber, pagination.pageSize, sorting.orderBy, sorting.sortBy, debouncedSearchQuery, debouncedWithDeleted);
            setData(result.items);

            setPagination({
                pageNumber: pagination.pageNumber,
                pageSize: result.pageSize,
                totalPage: result.totalPage,
                totalCount: result.totalCount
            });
        })

    }, [pagination.pageNumber, pagination.pageSize, sorting.sortBy, sorting.orderBy, debouncedSearchQuery, refresh, debouncedWithDeleted]);

    function refreshData() {
        setRefresh(!refresh);
    }

    const handlePageChange = (newPageNo: number) => {
        setPagination((prev: Pagination) => ({...prev, pageNumber: newPageNo}));
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPagination((prev: Pagination) => ({...prev, pageSize: newPageSize, pageNumber: 1}));
    };

    const handleSortingChange = (orderBy?: string, sortBy?: 'asc' | 'desc') => {
        setSorting({orderBy, sortBy});
        setPagination((prev: Pagination) => ({...prev, pageNumber: 1})); // Reset to first page when sorting changes
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setPagination((prev: Pagination) => ({...prev, pageNumber: 1})); // Reset to first page when searching
    };


    return (
        <Card className=''>
            <CardHeader>
                <CardTitle>
                    <div className='rounded-md flex items-center justify-between'>
                        <h1 className='font-semibold'>All Class</h1>

                        <Link href={'./classes/form'}>
                            <Button>Add New</Button>
                        </Link>
                    </div>

                </CardTitle>

                {/*<Separator className='my-2'/>*/}

                <div className='mb-4 mt-2 flex items-center gap-2'>
                    <Input
                        placeholder="Search classes..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="max-w-sm"
                    />

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="toggle-mode"
                            checked={withDeleted}
                            onCheckedChange={(checked) => setWithDeleted(checked)}
                        />
                        <Label htmlFor="toggle-mode">With Deleted</Label>
                    </div>


                </div>
            </CardHeader>

            <CardContent>
                <DataTable
                    columns={userColumns(refreshData)}
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
            </CardContent>


        </Card>
    )


}


export default ClassesPage;





















