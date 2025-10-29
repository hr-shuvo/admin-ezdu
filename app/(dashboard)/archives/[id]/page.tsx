'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ArrowLeft,
    Edit,
    Calendar,
    Clock,
    User,
    Video,
    Link2,
    FileText,
    BookOpen,
    ExternalLink,
    Play, Trash, Tag, Pencil, PencilOff
} from 'lucide-react';
import Link from "next/link";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { cn } from "@/lib/utils";
import { notFound, useParams, useRouter } from "next/navigation";
import { formatDateTime } from "@/lib/utils/datetime-helper-fns";
import Loading from "@/app/(dashboard)/loading";
import { Badge } from "@/components/ui/badge";
import { StatusMap } from "@/lib/constants/status";
import { showToast } from "@/components/common/toast";
import { archiveService } from "@/services/archive-service";
import Image from "next/image";


export default function TopicDetails() {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (params.id) {
                    const response = await archiveService.get(Number(params.id));
                    console.log(response);

                    if (!response) {
                        notFound();
                    }

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
            await archiveService.delete(data.id);
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
                                <CardDescription className="text-muted-foreground">Topic ID:
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
                                            "flex items-center gap-2 text-red-500 bg-transparent hover:bg-red-500 hover:text-white dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
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
                            <CardTitle>Archive Exam Information</CardTitle>
                            <CardDescription>Basic details about this topic</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Topic Name</p>
                                    <p className="text-lg font-semibold mt-1">{data.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Year</p>
                                    <p className="text-lg font-semibold mt-1 capitalize">
                                        {data.year || 'N/A'}
                                    </p>
                                </div>
                                <div className='lg:col-span-2'>
                                    <p className="text-sm font-medium text-gray-500">Description</p>
                                    <p className="text-lg font-semibold mt-1 capitalize">
                                        {data.description || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Subject</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-lg font-semibold">data.subject.nam</p>
                                        <Link
                                            href={`/subjects/`}
                                            className="text-blue-500 hover:text-blue-700 transition-colors"
                                            title="View Subject"
                                        >
                                            <ExternalLink className="w-4 h-4"/>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Lesson</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-lg font-semibold">data.lesson.name</p>
                                        <Link
                                            href={`/subjects/`}
                                            className="text-blue-500 hover:text-blue-700 transition-colors"
                                            title="View Lesson"
                                        >
                                            <ExternalLink className="w-4 h-4"/>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Segment</p>
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
                            </div>

                            {data.content && (
                                <>
                                    <div className="border-t pt-4 mt-4"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-2">Content</p>
                                        <div className="p-4 rounded-lg">
                                            <p className="text-base">{data.content}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>MCQs</CardTitle>
                            <CardDescription>Questions with options, hints, and explanations</CardDescription>
                        </CardHeader>

                        <CardContent>
                            {data && data?.questions && data?.questions?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.questions.map((question: any, index: number) => (
                                        <div key={question.id} className="p-4 border rounded-lg space-y-4">

                                            <div className="flex justify-between gap-2">
                                                <div>
                                                    <p className="font-semibold text-base">
                                                        {index + 1}. {question.name}
                                                    </p>
                                                </div>

                                                <Link href={''}
                                                      className='flex justify-between gap-2  text-blue-500 hover:text-blue-700 transition-colors font-semibold text-base'>
                                                    Edit
                                                    <Pencil className="w-4 h-4"/>

                                                </Link>
                                            </div>

                                            {question.passage && (
                                                <p className="text-sm text-muted-foreground my-2 p-2 rounded">
                                                    {question.passage}
                                                </p>
                                            )}

                                            {question.imageUrl && (
                                                <div className="mt-2">
                                                    <Image
                                                        src={question.imageUrl}
                                                        alt="Question"
                                                        className="rounded-lg border max-h-48 object-contain"
                                                    />
                                                </div>
                                            )}


                                            <ul className="space-y-2">
                                                {question.options.map((opt: any, i: number) => (
                                                    <li
                                                        key={opt.id}
                                                        className={`p-2 border rounded-lg text-sm flex items-start gap-2 ${
                                                            opt.isCorrect
                                                                ? "border-green-50 text-green-700 dark:border-green-800 dark:text-green-400"
                                                                : "hover:bg-gray-50 dark:hover:bg-gray-800"

                                                        }`}
                                                    >
                  <span className="font-medium">
                    {String.fromCharCode(65 + i)}.
                  </span>
                                                        <span>{opt.name}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Hint */}
                                            {question.hint && (
                                                <div
                                                    className="text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 p-2 rounded-lg dark:text-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-800"
                                                >
                                                    💡 Hint: {question.hint}
                                                </div>

                                            )}

                                            {/* Explanation */}
                                            {question.explanation && (
                                                <div
                                                    className="text-sm text-gray-800 bg-gray-50 border border-gray-200 p-2 rounded-lg dark:text-gray-200 dark:bg-gray-900/40 dark:border-gray-700"
                                                >
                                                    🧠 Explanation: {question.explanation}
                                                </div>

                                            )}

                                            {/* Explanation Image */}
                                            {question.explanationImageUrl && (
                                                <div className="mt-2">
                                                    <img
                                                        src={question.explanationImageUrl}
                                                        alt="Explanation"
                                                        className="rounded-lg border max-h-40 object-contain"
                                                    />
                                                </div>
                                            )}

                                            {/* Explanation Resource or Video */}
                                            {(question.explanationVideoUrl || question.explanationResourceUrl) && (
                                                <div className="flex flex-wrap gap-3 mt-2">
                                                    {question.explanationVideoUrl && (
                                                        <a
                                                            href={question.explanationVideoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-blue-600 underline flex items-center gap-1"
                                                        >
                                                            🎥 Watch Explanation Video
                                                        </a>
                                                    )}
                                                    {question.explanationResourceUrl && (
                                                        <a
                                                            href={question.explanationResourceUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-blue-600 underline flex items-center gap-1"
                                                        >
                                                            📄 View Resource
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No MCQs available.</p>
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
                                    <BookOpen className="h-5 w-5 text-purple-500"/>
                                    <span className="text-sm font-medium">Total Questions</span>
                                </div>
                                <span className="text-2xl font-bold text-purple-500">{data.questions.length}</span>
                            </div>
                            <div className="flex items-center justify-between p-3  rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Video className="h-5 w-5 text-blue-500"/>
                                    <span className="text-sm font-medium">Video Content</span>
                                </div>
                                <span className="text-2xl font-bold text-blue-500">
                    {data.videoUrl ? '1' : '0'}
                  </span>
                            </div>
                            <div className="flex items-center justify-between p-3  rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-green-500"/>
                                    <span className="text-sm font-medium">Resources</span>
                                </div>
                                <span className="text-2xl font-bold text-green-500">
                    {data.resourceUrl ? '1' : '0'}
                  </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Related Topics</CardTitle>
                            <CardDescription>Other topics in this subject</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {[
                                {name: 'Environmental Ethics', lessons: 8},
                                {name: 'Community Service', lessons: 10},
                                {name: 'Global Citizenship', lessons: 6},
                                {name: 'Ethical Leadership', lessons: 9}
                            ].map((topic, i) => (
                                <div key={i}
                                     className="p-3 border rounded-lg cursor-pointer">
                                    <p className="font-medium text-sm">{topic.name}</p>
                                    <p className="text-xs text-gray-500">{topic.lessons} lessons •
                                        Subject {data.subjectId}</p>
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
                                <FileText className="h-4 w-4 mr-2"/>
                                View Topics
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Video className="h-4 w-4 mr-2"/>
                                Add Video
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Link2 className="h-4 w-4 mr-2"/>
                                Add Resources
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <BookOpen className="h-4 w-4 mr-2"/>
                                View Subject
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-lg">Need Help?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-700 mb-3">
                                Learn how to create engaging topic content with videos and resources.
                            </p>
                            <Button variant="outline" size="sm" className="w-full">
                                View Documentation
                            </Button>
                        </CardContent>
                    </Card>
                </div>


            </div>
        </div>
    );
}