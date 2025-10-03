'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Calendar, User, Clock, Tag, Trash } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { cn } from "@/lib/utils";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { StatusMap } from "@/lib/constants/status";
import { formatDateTime } from "@/lib/utils/datetime-helper-fns";
import Link from "next/link";
import { classService } from "@/services/class.service";
import { showToast } from "@/components/common/toast";
import { notFound, useParams, useRouter } from "next/navigation";
import Loading from "@/app/(dashboard)/loading";

const ClassDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (params.id) {
                    const response = await classService.get(Number(params.id));

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
            await classService.delete(data.id);
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
        <div className=" mx-auto space-y-6">
            {/* Header Card */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/*<Button variant="ghost" size="icon" onClick={() => window.history.back()}>*/}
                            {/*    <ArrowLeft className="h-5 w-5"/>*/}
                            {/*</Button>*/}

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
                            {/*<Link href='./'>*/}
                            {/*    <Button variant="outline" className="flex items-center gap-2">*/}
                            {/*        <ArrowLeft className="w-4 h-4"/>*/}
                            {/*        Back*/}
                            {/*    </Button>*/}
                            {/*</Link>*/}

                            <Link href={`./form/${data.id}`}>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Edit className="w-4 h-4"/>
                                    Edit
                                </Button>
                            </Link>


                            <ConfirmDialog
                                title={`Delete ${data.name}`}
                                description="Are you sure you want to delete this class? This action cannot be undone."
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

            <div className="grid gap-6 md:grid-cols-3">
                {/* Class Information Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Class Information</CardTitle>
                        <CardDescription>Detailed information about this class</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                <Label className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    Status
                                </Label>

                                <span>:</span>
                                <Badge
                                    className={StatusMap[data.status].color}
                                    variant="outline"
                                >
                                    {StatusMap[data.status].text}
                                </Badge>
                            </div>


                            <Separator/>

                            <div>
                                <Label>Segment</Label>
                                <p className="mt-2">
                                    <Badge variant="secondary">Segment {data.segment}</Badge>
                                </p>
                            </div>

                            <Separator/>

                            <div>
                                <Label>Groups</Label>
                                <p className="mt-2">
                                    {
                                        data.groups.map((group: string) => (
                                            <Badge key={group} variant="outline"
                                                   className="capitalize mr-1">{group}</Badge>
                                        ))
                                    }
                                </p>
                            </div>

                            <Separator/>

                            <div>
                                <Label>Has Batch</Label>
                                <p className="mt-2">
                                    {data.hasBatch ? (
                                        <Badge>Yes</Badge>
                                    ) : (
                                        <Badge variant="secondary">No</Badge>
                                    )}
                                </p>
                            </div>

                            <Separator/>

                            <div>
                                <Label>Class Name</Label>
                                <p className="mt-2">{data.name}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Metadata Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Metadata</CardTitle>
                        <CardDescription>Timestamps and user information</CardDescription>
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

            {/* Additional Information Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Additional Details</CardTitle>
                    <CardDescription>Extended information and related data</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <Label>Total Students</Label>
                                    <span className="font-medium">0</span>
                                </div>
                                <Separator/>
                                <div className="flex justify-between">
                                    <Label>Total Subjects</Label>
                                    <span className="font-medium">0</span>
                                </div>
                                <Separator/>
                                <div className="flex justify-between">
                                    <Label>Active Teachers</Label>
                                    <span className="font-medium">0</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Class Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Class Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <Label>Batch System</Label>
                                    <span
                                        className="font-medium">{data.hasBatch ? 'Enabled' : 'Disabled'}</span>
                                </div>
                                <Separator/>
                                <div className="flex justify-between">
                                    <Label>Group Type</Label>
                                    <span className="font-medium capitalize">{data.groups}</span>
                                </div>
                                <Separator/>
                                <div className="flex justify-between">
                                    <Label>Segment Level</Label>
                                    <span className="font-medium">{data.segment}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ClassDetailsPage;