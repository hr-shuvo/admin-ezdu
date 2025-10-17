'use client';

import React, { useEffect, useState } from 'react';
import {
    ArrowLeft, Edit, Trash, Calendar, Clock, User, FileText,
    CheckCircle, XCircle, Timer, Award, BookOpen, AlertCircle,
    ExternalLink, Play, Video, Link2, Tag
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusMap } from "@/lib/constants/status";
import { formatDateTime } from "@/lib/utils/datetime-helper-fns";
import { notFound, useParams, useRouter } from "next/navigation";
import { showToast } from "@/components/common/toast";
import Loading from "@/app/(dashboard)/loading";
import { quizService } from "@/services/quiz.service";
import Link from "next/link";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { cn } from "@/lib/utils";


const QuizDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (params.id) {
                    const response = await quizService.getDetails(Number(params.id));
                    // console.log(response);

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
            await quizService.delete(data.id);
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
                                <CardDescription className="text-muted-foreground">Lesson ID:
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

                    <div className=" rounded-lg shadow-sm border">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Quiz Information</h2>
                            <p className="text-sm text-gray-500 mt-1">Basic details about this quiz</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Quiz Name</p>
                                    <p className="text-lg font-semibold mt-1">{data.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Type</p>
                                    <p className="text-lg font-semibold mt-1">{data.type}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Marks</p>
                                    <p className="text-lg font-semibold mt-1 text-sky-600">{data.totalMarks}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Passing Marks</p>
                                    <p className="text-lg font-semibold mt-1 text-green-600">{data.passingMarks}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Duration</p>
                                    <p className="text-lg font-semibold mt-1">{data.durationInMinutes} minutes</p>
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

                            {data.description && (
                                <>
                                    <div className="border-t pt-4 mt-4"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-2">Description</p>
                                        <div className="p-4 rounded-lg">
                                            <p className="text-base">{data.description}</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="border-t pt-4 mt-4"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3  rounded-lg">
                                    <Calendar className="h-5 w-5 text-sky-600"/>
                                    <div>
                                        <p className="text-xs text-gray-600">Start Time</p>
                                        <p className="text-sm font-semibold">{formatDateTime(data.startTime)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg">
                                    <Clock className="h-5 w-5 text-red-600"/>
                                    <div>
                                        <p className="text-xs text-gray-600">End Time</p>
                                        <p className="text-sm font-semibold">{formatDateTime(data.endTime)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 p-3  rounded-lg">
                                {data.hasNegativeMarks ? (
                                    <>
                                        <XCircle className="h-5 w-5 text-red-600"/>
                                        <span className="text-sm font-medium">Negative marking enabled</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="h-5 w-5 text-green-600"/>
                                        <span className="text-sm font-medium">No negative marking</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Questions Card */}
                    <div className=" rounded-lg shadow-sm border">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Questions ({data.questions.length})</h2>
                            <p className="text-sm text-gray-500 mt-1">Review all quiz questions</p>
                        </div>
                        <div className="p-6 space-y-4">
                            {data.questions.map((question: any, index: number) => (
                                <div key={question.id}
                                     className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-start gap-3 flex-1">
                        <span
                            className="flex items-center justify-center w-8 h-8 bg-sky-100 text-sky-600 rounded-full font-semibold text-sm">
                          {index + 1}
                        </span>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{question.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{question.passage}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                        <span className={`text-sm font-medium `}>
                          DifficultyMap[question.difficultyLevel].text
                        </span>
                                            <span className="text-sm font-semibold text-gray-700">
                          {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
                        </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        {question.options.map((option: any) => (
                                            <div
                                                key={option.id}
                                                className={`p-3 rounded-lg border-2 ${
                                                    option.isCorrect
                                                        ? 'bg-green-50 dark:bg-green-900 border-green-300'
                                                        : 'bg-gray-50 dark:bg-gray-900 border-gray-200'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">{option.name}</span>
                                                    {option.isCorrect && (
                                                        <CheckCircle className="w-5 h-5 text-green-600"/>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {question.hint && (
                                        <div
                                            className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                            <p className="text-xs font-medium text-yellow-800 dark:text-yellow-200 mb-1">💡
                                                Hint</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{question.hint}</p>
                                        </div>
                                    )}

                                    {question.explanation && (
                                        <div
                                            className="mt-3 p-3 bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 rounded-lg">
                                            <p className="text-xs font-medium text-sky-800 dark:text-sky-200 mb-1">📝
                                                Explanation</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{question.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Audit Information Card */}
                    <div className=" rounded-lg shadow-sm border">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Audit Information</h2>
                            <p className="text-sm text-gray-500 mt-1">Track record of changes</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-gray-400 mt-0.5"/>
                                <div>
                                    <p className="text-sm font-medium">Created At</p>
                                    <p className="text-sm text-gray-600">{formatDateTime(data.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-gray-400 mt-0.5"/>
                                <div>
                                    <p className="text-sm font-medium">Last Updated</p>
                                    <p className="text-sm text-gray-600">{formatDateTime(data.updatedAt)}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-gray-400 mt-0.5"/>
                                <div>
                                    <p className="text-sm font-medium">Created By</p>
                                    <p className="text-sm text-gray-600">{data.createdBy || 'System'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-gray-400"/>
                                <div>
                                    <p className="text-sm font-medium">Last Updated By</p>
                                    <p className="text-sm text-gray-600">{data.updatedBy || 'System'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                    {/* Quick Stats Card */}
                    <div className=" rounded-lg shadow-sm border">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold">Quick Stats</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div
                                className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-purple-600"/>
                                    <span className="text-sm font-medium">Total Questions</span>
                                </div>
                                <span className="text-2xl font-bold text-purple-600">{data.questions.length}</span>
                            </div>
                            <div
                                className="flex items-center justify-between p-3 bg-sky-50 dark:bg-sky-900 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-sky-600"/>
                                    <span className="text-sm font-medium">Total Marks</span>
                                </div>
                                <span className="text-2xl font-bold text-sky-600">{data.totalMarks}</span>
                            </div>
                            <div
                                className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600"/>
                                    <span className="text-sm font-medium">Pass Marks</span>
                                </div>
                                <span className="text-2xl font-bold text-green-600">{data.passingMarks}</span>
                            </div>
                            <div
                                className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Timer className="h-5 w-5 text-orange-600"/>
                                    <span className="text-sm font-medium">Duration</span>
                                </div>
                                <span className="text-2xl font-bold text-orange-600">{data.durationInMinutes}m</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className=" rounded-lg shadow-sm border">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold">Quick Actions</h3>
                        </div>
                        <div className="p-6 space-y-2">
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg  transition-colors">
                                <Play className="h-4 w-4"/>
                                Preview Quiz
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg  transition-colors">
                                <FileText className="h-4 w-4"/>
                                Add Question
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg  transition-colors">
                                <BookOpen className="h-4 w-4"/>
                                View Results
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg  transition-colors">
                                <ExternalLink className="h-4 w-4"/>
                                Share Quiz
                            </button>
                        </div>
                    </div>

                    {/* Help Card */}
                    <div
                        className="bg-sky-50 dark:bg-sky-950 rounded-lg shadow-sm border border-sky-200">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                            <p className="text-sm  mb-4">
                                Learn how to create effective quizzes and manage questions.
                            </p>
                            <button
                                className="w-full px-4 py-2  border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default QuizDetailsPage;