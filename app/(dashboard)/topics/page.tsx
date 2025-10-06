'use client';

import { useEffect, useState, useTransition } from "react";
import { DataTable } from "@/components/tables/data-table";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Pagination, Sorting } from "@/lib/constants/pagination";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { topicService } from "@/services/topic.service";
import { topicColumns } from "@/app/(dashboard)/topics/columns";
import SelectList from "@/components/common/select-list";
import { classService } from "@/services/class.service";
import { subjectService } from "@/services/subject.service";
import { lessonService } from "@/services/lesson.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


const TopicsPage = () => {
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

    const [classId, setClassId] = useState<number>();
    const [subjectId, setSubjectId] = useState<number>();
    const debouncedSubjectId = useDebounce(subjectId, 500);
    const [lessonId, setLessonId] = useState<number>();
    const debouncedLessonId = useDebounce(lessonId, 500);


    useEffect(() => {

        startTransition(async () => {
            const result = await topicService.getList(pagination.pageNumber, pagination.pageSize, sorting.orderBy, sorting.sortBy, debouncedSearchQuery, debouncedWithDeleted, debouncedSubjectId, debouncedLessonId);
            // console.log(result);
            setData(result.items);

            setPagination({
                pageNumber: pagination.pageNumber,
                pageSize: result.pageSize,
                totalPage: result.totalPage,
                totalCount: result.totalCount
            });
        })

    }, [pagination.pageNumber, pagination.pageSize, sorting.sortBy, sorting.orderBy, debouncedSearchQuery, refresh, debouncedWithDeleted, debouncedSubjectId, debouncedLessonId]);

    const loadClasses = async (page: number, limit: number, search?: string | undefined): Promise<any> => {
        try {
            const result = await classService.getList(page, limit, undefined, undefined, search);
            // console.log(result.items);
            // setClasses(result.items);

            return {items: result.items, total: result.totalCount};

        } catch (error) {
            console.log(error);
        }
    };

    const loadSubjects = async (page: number, limit: number, search?: string | undefined): Promise<any> => {
        if (!classId) return {items: [], total: 0};

        try {
            const result = await subjectService.getList(page, limit, undefined, undefined, search, undefined, classId);
            // console.log('subjects: ', result.items);
            // setClasses(result.items);

            return {items: result.items, total: result.totalCount};

        } catch (error) {
            console.log(error);
        }
    };

    const loadLessons = async (page: number, limit: number, search?: string | undefined): Promise<any> => {
        if (!subjectId) return {items: [], total: 0};

        try {
            const result = await lessonService.getList(page, limit, undefined, undefined, search, undefined, subjectId);
            // console.log('subjects: ', result.items);
            // setClasses(result.items);

            return {items: result.items, total: result.totalCount};

        } catch (error) {
            console.log(error);
        }
    };


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
                        <h1 className='font-semibold'>All Topics</h1>

                        <Link href={'./topics/form'}>
                            <Button>Add New</Button>
                        </Link>
                    </div>
                </CardTitle>



                <div className='mb-4 flex items-center gap-2'>
                    <Input
                        placeholder="Search topics..."
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

                    <div>
                        <SelectList
                            value={classId}
                            onValueChange={(val) => {
                                setClassId(Number(val));
                                setSubjectId(0);
                            }}
                            loadItems={loadClasses}
                            placeholder="Select Class"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <SelectList
                            key={classId}
                            value={subjectId}
                            onValueChange={(val) => {
                                setSubjectId(Number(val));
                            }}
                            loadItems={loadSubjects}
                            placeholder="Select Subject"
                            emptyText={classId ? "No subjects found." : "Select class first"}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <SelectList
                            key={subjectId}
                            value={lessonId}
                            onValueChange={(val) => {
                                setLessonId(Number(val));
                            }}
                            loadItems={loadLessons}
                            placeholder="Select Lesson"
                            emptyText={subjectId ? "No lesson found." : "Select subject first"}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <Button variant='outline' onClick={() =>{
                            setClassId(0);
                            setSubjectId(0);
                            setLessonId(0);
                            setSearchQuery('');
                            setWithDeleted(false);
                        }}>Reset filter</Button>
                    </div>


                </div>
            </CardHeader>



            <CardContent>
                <DataTable
                    columns={topicColumns(refreshData)}
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


export default TopicsPage;





















