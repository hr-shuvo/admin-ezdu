'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Calendar, Users, BookOpen, FileText, Clock, User, Trash, Tag } from 'lucide-react';
import Link from "next/link";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { cn } from "@/lib/utils";
import { notFound, useParams, useRouter } from "next/navigation";
import { subjectService } from "@/services/subject.service";
import { formatDateTime } from "@/lib/utils/datetime-helper-fns";
import Loading from "@/app/(dashboard)/loading";
import { StatusMap } from "@/lib/constants/status";
import { Badge } from "@/components/ui/badge";
import { showToast } from "@/components/common/toast";


export default function ClassDetails() {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (params.id) {
                    const response = await subjectService.get(Number(params.id));

                    if (!response) {
                        notFound();
                    }

                    response.groups = response.groups ? response.groups.split(',').map((group: string) => group.trim()) : [];
                    console.log(response.groups);
                    setData(response);
                }
            } catch (error) {
                notFound();
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id, router]);

    const handleDelete = async () => {
        try {
            await subjectService.delete(data.id);
            showToast("Delete Success", "info");
            router.push(".");
        } catch {
        }
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!data) {
        notFound();
    }

    return (
        <div className="mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href='./'>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4"/>
                                </Button>
                            </Link>
                            <div>
                                <CardTitle className="text-3xl font-bold tracking-tight">{data.name}</CardTitle>
                                <CardDescription className="text-muted-foreground">Class ID:
                                    #{data.id}</CardDescription>
                            </div>
                        </div>
                        <div className="flex gap-2">

                            <Link href={`./form/${data.id}`}>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Edit className="w-4 h-4"/>
                                    Edit
                                </Button>
                            </Link>


                            <ConfirmDialog
                                title={`Delete ${data.name}`}
                                description="Are you sure you want to delete this subject? This action cannot be undone."
                                confirmText="Delete"
                                cancelText="Cancel"
                                confirmColor="destructive"
                                onConfirm={handleDelete}
                                trigger={
                                    <Button
                                        disabled={isLoading}
                                        className={cn(
                                            "flex items-center gap-2 text-red-500 bg-transparent hover:bg-red-500 hover:text-white dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                        )}
                                        onClick={(e) => e.preventDefault()} // changed from onSelect to onClick
                                    >
                                        <Trash
                                            className={cn(
                                                "w-4 h-4",
                                                isLoading && "animate-spin"
                                            )}
                                        />
                                        Delete
                                    </Button>

                                }
                            />
                        </div>
                    </div>
                </CardHeader>
            </Card>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Information</CardTitle>
                            <CardDescription>Basic details about this class</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Class Name</p>
                                    <p className="text-lg font-semibold mt-1">{data.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Class Code</p>
                                    <p className="text-lg font-semibold mt-1">{data.code}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Class ID</p>
                                    <p className="text-lg font-semibold mt-1">#{data.classId}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Segment</p>
                                    <p className="text-lg font-semibold mt-1">Segment {data.segment}</p>
                                </div>
                                <div>
                                    <p className="flex items-center gap-2">
                                        <Tag className="w-4 h-4"/>
                                        Status
                                    </p>
                                    <div className="mt-1">
                                        <Badge
                                            className={StatusMap[data.status].color}
                                            variant="outline"
                                        >
                                            {StatusMap[data.status].text}
                                        </Badge></div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Record ID</p>
                                    <p className="text-lg font-semibold mt-1">#{data.id}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Assessment Configuration</CardTitle>
                            <CardDescription>Class assessment and examination settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`p-3 rounded-lg ${data.hasPaper ? 'bg-green-100' : 'bg-gray-100 dark:bg-gray-600'}`}>
                                        <FileText
                                            className={`h-6 w-6 ${data.hasPaper ? 'text-green-600' : 'text-gray-400'
                                            }`}/>
                                    </div>
                                    <div>
                                        <p className="font-medium">Written Paper</p>
                                        <p className="text-sm text-gray-600">{data.hasPaper ? 'Enabled' : 'Disabled'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`p-3 rounded-lg ${data.hasPractical ? 'bg-blue-100' : 'bg-gray-100 dark:bg-gray-600'}`}>
                                        <FileText className={`h-6 w-6 ${data.hasPractical ? 'text-blue-600'
                                            : 'text-gray-400 '}`}/>
                                    </div>
                                    <div>
                                        <p className="font-medium">Practical Exam</p>
                                        <p className="text-sm text-gray-600">{data.hasPractical ? 'Enabled' : 'Disabled'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Groups & Students</CardTitle>
                            <CardDescription>Associated groups for this class</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {data.groups && data.groups.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {data.groups.map((groupId: any) => (
                                        <span key={groupId}
                                              className="px-3 py-1 border rounded-md text-sm">Group {groupId}</span>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-2"/>
                                    <p className="text-gray-600">No groups assigned to this class</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Audit Information</CardTitle>
                            <CardDescription>Track record of changes</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5"/>
                                <div>
                                    <p className="text-sm font-medium">Created At</p>
                                    <p className="text-sm text-muted-foreground">{formatDateTime(data.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-muted-foreground mt-0.5"/>
                                <div>
                                    <p className="text-sm font-medium">Last Updated</p>
                                    <p className="text-sm text-muted-foreground">{formatDateTime(data.updatedAt)}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-muted-foreground mt-0.5"/>
                                <div>
                                    <p className="text-sm font-medium">Created By</p>
                                    <p className="text-sm text-muted-foreground">{data.createdBy || 'System'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-muted-foreground"/>
                                <div>
                                    <p className="text-sm font-medium">Last Updated By</p>
                                    <p className="text-sm text-muted-foreground">{data.updatedBy || 'System'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-blue-600"/>
                                    <span className="text-sm font-medium">Total Students</span>
                                </div>
                                <span className="text-2xl font-bold text-blue-600">32</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-green-600"/>
                                    <span className="text-sm font-medium">Active Groups</span>
                                </div>
                                <span className="text-2xl font-bold text-green-600">{data.groups?.length || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-purple-600"/>
                                    <span className="text-sm font-medium">Assignments</span>
                                </div>
                                <span className="text-2xl font-bold text-purple-600">8</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Related Classes</CardTitle>
                            <CardDescription>Similar classes in this segment</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {['Mathematics 101', 'Physics Advanced', 'Chemistry Basic'].map((name, i) => (
                                <div key={i}
                                     className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer">
                                    <p className="font-medium text-sm">{name}</p>
                                    <p className="text-xs text-gray-600">Segment 2 • {28 - i * 2} students</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <Users className="h-4 w-4 mr-2"/>Manage Students
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2"/>View Assignments
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Calendar className="h-4 w-4 mr-2"/>Class Schedule
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <BookOpen className="h-4 w-4 mr-2"/>Course Materials
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )


}