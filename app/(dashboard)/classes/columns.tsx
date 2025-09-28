'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit, Eye, MoreHorizontal, RotateCw, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EntityStatus, StatusMap } from "@/lib/constants/status";
import { formatDateTime } from "@/lib/utils/datetime-helper-fns";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { useTransition } from "react";
import { classService } from "@/services/class.service";
import { showToast } from "@/components/common/toast";
import { cn } from "@/lib/utils";


export const classColumns = (refreshData: () => void): ColumnDef<any>[] => [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        id: "index",
        header: "#",
        cell: ({row, table}) => {
            const pageNumber = table.getState().pagination.pageIndex;
            const pageSize = table.getState().pagination.pageSize;
            return <div>{pageNumber * pageSize + row.index + 1}</div>; // +1 to start counting from 1
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    },
    {
        accessorKey: 'groups',
        header: "Groups",
        cell: ({getValue}) => {
            const groups = getValue() as string;

            return groups ? (
                <div>{groups}</div>
            ) : (
                <div>-</div>
            );
        }
    },
    {
        accessorKey: 'updatedAt',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    UpdatedAt
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({getValue}) => {
            const date = new Date(getValue<string>());

            const formattedDate = formatDateTime(date, "dd MMM yyyy, HH:mm");

            return (
                <div>{formattedDate}</div>
            )
        }
    },
    {
        accessorKey: 'createdAt',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CreatedAt
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({getValue}) => {
            const date = new Date(getValue<string>());

            const formattedDate = formatDateTime(date, "dd MMM yyyy, HH:mm");

            return (
                <div>{formattedDate}</div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            const status = (row.getValue("status") ?? 0) as EntityStatus;

            return (
                <Badge className={StatusMap[status].color} variant="outline">
                    {StatusMap[status].text}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        cell: ({row}) => <ActionCell data={row.original} refreshData={refreshData}/>
    }

];


const ActionCell = ({data, refreshData}: { data: any, refreshData: () => void }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();


    const handleDelete = () => {
        startTransition(async () => {
            try {
                await classService.delete(data.id);
                refreshData();
                showToast("Delete Success", "info")
            } catch {
            }
        })
    };

    const handlePermanentDelete = () => {
        startTransition(async () => {
            try {
                await classService.delete(data.id);
                refreshData();
                showToast("Delete Success", "info")
            } catch {
            }
        })
    };

    const handleRestore = () => {
        startTransition(async () => {
            try {
                await classService.restore(data.id);
                showToast("Restore Success", "success")
            } catch {
            }
        })
    }


    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem disabled={isPending}
                                  onClick={() => navigator.clipboard.writeText(data.id)}
                >
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator/>

                <DropdownMenuItem disabled={isPending}
                                  className="text-blue-500 hover:bg-blue-100 flex items-center gap-2"
                                  onClick={() => router.push(`./classes/${data.id}`)}>
                    <Eye className="w-4 h-4 text-blue-500 hover:bg-blue-100"/>
                    View
                </DropdownMenuItem>

                <DropdownMenuItem disabled={isPending}
                                  className="text-green-500 hover:bg-green-100 flex items-center gap-2"
                                  onClick={() => router.push(`./classes/form/${data.id}`)}>
                    <Edit className="w-4 h-4 text-green-500 hover:bg-green-100 "/>
                    Edit
                </DropdownMenuItem>


                {
                    data.status === -404 ? (
                            <>
                                <DropdownMenuItem disabled={isPending}
                                                  className="text-orange-500 hover:bg-orange-100 flex items-center gap-2"
                                                  onClick={handleRestore}>
                                    <RotateCw className="w-4 h-4 text-orange-500"/>
                                    Restore
                                </DropdownMenuItem>

                                <ConfirmDialog
                                    title="Permanent Delete Class"
                                    description="Are you sure you want to permanent delete this class? This action cannot be undone."
                                    confirmText="Permanent Delete"
                                    cancelText="Cancel"
                                    confirmColor="destructive"
                                    onConfirm={handlePermanentDelete}
                                    trigger={
                                        <DropdownMenuItem disabled={isPending}
                                                          className="text-red-500 hover:bg-red-100 flex items-center gap-2"
                                                          onSelect={(e) => e.preventDefault()}
                                        >
                                            <Trash className="w-4 h-4 text-red-500 hover:bg-red-100"/>
                                            Permanent Delete
                                        </DropdownMenuItem>
                                    }
                                />

                            </>
                        )
                        : (
                            <ConfirmDialog
                                title={`Delete ${data.name}`}
                                description="Are you sure you want to delete this class? This action cannot be undone."
                                confirmText="Delete"
                                cancelText="Cancel"
                                confirmColor="destructive"
                                onConfirm={handleDelete}
                                trigger={
                                    <DropdownMenuItem disabled={isPending}
                                                      className="text-red-500 hover:bg-red-100 flex items-center gap-2 disabled"
                                                      onSelect={(e) => e.preventDefault()}
                                    >
                                        <Trash
                                            className={cn("w-4 h-4 text-red-500 hover:bg-red-100", isPending && "animate-spin")}/>
                                        Delete
                                    </DropdownMenuItem>
                                }
                            />
                        )
                }


            </DropdownMenuContent>
        </DropdownMenu>

    );

}

