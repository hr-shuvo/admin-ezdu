"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel, getSortedRowModel, PaginationState, SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/tables/table-pagination";
import { useState, useEffect } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    loading?: boolean,
    pagination?: {
        pageNumber: number,
        pageSize: number,
        totalPage: number,
        totalCount: number,
    },
    onPaginationChange: (pagination: { pageNumber: number, pageSize: number }) => void,
    onSortingChange: (sortBy?: string, sortOrder?: 'asc' | 'desc') => void,
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             loading = false,
                                             pagination,
                                             onPaginationChange,
                                             onSortingChange,
                                         }: DataTableProps<TData, TValue>) {


    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [paginationState, setPaginationState] = useState<PaginationState>({
        pageIndex: pagination?.pageNumber ?? 0,
        pageSize: pagination?.pageSize ?? 10,
    });

    useEffect(() => {
        if (pagination &&
            (pagination.pageNumber !== paginationState.pageIndex ||
                pagination.pageSize !== paginationState.pageSize)
        ) {
            setPaginationState({
                pageIndex: pagination.pageNumber,
                pageSize: pagination.pageSize
            });
        }
    }, [pagination, paginationState.pageIndex, paginationState.pageSize]);

    useEffect(() => {
        if (!onSortingChange) return;

        if (sorting.length > 0) {
            const sort = sorting[0];
            onSortingChange(sort.id, sort.desc ? 'desc' : 'asc');
        } else {
            onSortingChange(undefined, undefined);
        }
    }, [sorting]);


    // useEffect(() => {
    //     if (onSortingChange && sorting.length > 0) {
    //         const sort = sorting[0];
    //         onSortingChange(sort.id, sort.desc ? 'desc' : 'asc');
    //     } else if (onSortingChange && sorting.length === 0) {
    //         onSortingChange(undefined, undefined);
    //     }
    // }, [onSortingChange, sorting]);


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onPaginationChange: (updater) => {
            const newPagination = typeof updater === "function" ? updater(paginationState) : updater;
            setPaginationState(newPagination);
            onPaginationChange({pageNumber: newPagination.pageIndex, pageSize: newPagination.pageSize})
        },
        state: {sorting, rowSelection, pagination: paginationState},
        enableRowSelection: true,
        manualPagination: true,
        manualSorting: true,
        pageCount: pagination?.totalPage,
        meta: {
            totalCount: pagination?.totalCount
        }
    })

    return (
        <div className='space-y-4'>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>


            </div>

            {
                !loading && (<DataTablePagination table={table}/>)
            }

        </div>
    )
}