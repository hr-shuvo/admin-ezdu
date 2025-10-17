'use client';

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { classService } from "@/services/class.service";
import { showToast } from "@/components/common/toast";
import { enums } from "@/lib/constants/common";
import { useRouter } from "next/navigation";
import { subjectService } from "@/services/subject.service";
import { lessonService } from "@/services/lesson.service";
import { topicService } from "@/services/topic.service";
import SelectList from "@/components/common/select-list";
import { questionService } from "@/services/question-service";
import { quizSchema } from "@/schemas/quiz.schema";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "@/components/common/date-time-picker";
import { getInputDateTimeValue } from "@/lib/utils/datetime-helper-fns";
import { quizService } from "@/services/quiz.service";


const QuizCreatePage = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    const [classId, setClassId] = useState<number>();
    const [subjectId, setSubjectId] = useState<number>();

    const [selections, setSelections] = useState<{
        lessonId: number | null;
        topicId: number | null;
        questionId: number | null;
    }[]>([{lessonId: null, topicId: null, questionId: null}]);

    const form = useForm<z.infer<typeof quizSchema>>({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            name: '',
            type: 1,
            description: '',
            totalMarks: 1,
            passingMarks: 1,
            questionIds: [],
            status: 0,
        }
    });

    // const questionsIds = form.watch('questionIds') as number[];
    // const addQuestionId = (id: number) => form.setValue('questionIds', [...(questionsIds || []), id]);
    // const removeQuestionId = (id: number) => form.setValue('questionIds', (questionsIds || []).filter(qid => qid !== id));

    const updateSelection = (index: number, field: 'lessonId' | 'topicId' | 'questionId', value: number | null) => {
        setSelections(prev => {
            const updated = [...prev];
            updated[index] = {...updated[index], [field]: value};

            // Reset dependent fields
            if (field === 'lessonId') {
                updated[index].topicId = null;
                updated[index].questionId = null;
            } else if (field === 'topicId') {
                updated[index].questionId = null;
            }

            // Update form's questionIds array
            const questionIds = updated
                .map(s => s.questionId)
                .filter((id): id is number => id !== null);
            form.setValue('questionIds', questionIds);

            console.log(updated);
            return updated;
        });
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

    const loadTopics = async (page: number, limit: number, search?: string | undefined, lessonId?: number | null): Promise<any> => {
        if (!lessonId) return {items: [], total: 0};

        try {
            const result = await topicService.getList(page, limit, undefined, undefined, search, undefined, subjectId, lessonId);
            // console.log('subjects: ', result.items);
            // setClasses(result.items);

            return {items: result.items, total: result.totalCount};

        } catch (error) {
            console.log(error);
        }
    };

    const loadQuestions = async (page: number, limit: number, search?: string | undefined, lessonId?: number, topicId?: number): Promise<any> => {
        console.log(lessonId, ' - ', topicId);
        if (!lessonId && !topicId) return {items: [], total: 0};

        try {
            const result = await questionService.getList(page, limit, undefined, undefined, search, undefined, subjectId, lessonId, topicId);
            console.log('questions: ', result.items);
            // setClasses(result.items);

            return {items: result.items, total: result.totalCount};

        } catch (error) {
            console.log(error);
        }
    };


    const onSubmit = async (values: z.infer<typeof quizSchema>) => {
        setLoading(true);
        // form.setValue('startTime', getInputDateTimeValue(form.getValues('startTime')!))

        console.log(values);
        // console.log((getInputDateTimeValue(form.getValues('startTime')!)));
        // setLoading(false);
        // return;

        try {
            const result = await quizService.save(values);
            // form.reset();
            showToast(result.message, "success");
        } finally {
            setLoading(false);
        }
    }

    const onInvalid = (err: any) => {
        console.log(err);
        let msg = "Please add some option";

        if (err && err.options && err.options.message) {
            msg = err.options.message;
        } else if (err && err.options && err.options.root && err.options.root.message) {
            msg = err.options.root.message;
        } else if (err && err.options && Array.isArray(err.options) && err.options.length > 0) {
            msg = err.options[0].text.message;
        }

        showToast(msg, "error");
    }

    return (

        <div className="p-6">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create Quiz</CardTitle>
                        <CardDescription>
                            Add a new class to the academic system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="space-y-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                                        <div className="md:col-span-4">
                                            <FormField name="name" control={form.control} render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Quiz Title *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            placeholder="e.g., Mathematics 101"
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>

                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                        </div>

                                        <div className="md:col-span-2">
                                            <FormItem>
                                                <FormLabel>Class *</FormLabel>
                                                <FormControl>
                                                    <SelectList
                                                        value={classId}
                                                        onValueChange={(val) => {
                                                            setClassId(val);
                                                        }} // updates the form automatically
                                                        loadItems={classService.getSelectList}
                                                        // placeholder="Select a class..."
                                                        className="w-full"
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>

                                        </div>

                                        <div className="md:col-span-2">
                                            <FormItem>
                                                <FormLabel>Subject *</FormLabel>
                                                <FormControl>
                                                    <SelectList
                                                        key={classId}
                                                        value={subjectId}
                                                        onValueChange={(val) => {
                                                            setSubjectId(val);
                                                        }} // updates the form automatically
                                                        loadItems={loadSubjects}
                                                        // placeholder="Select a class..."
                                                        className="w-full"
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>

                                        </div>

                                        <div className="md:col-span-2">
                                            <FormField name="status" control={form.control} render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Status *</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(Number(value))}
                                                            value={field.value?.toString()}
                                                        >
                                                            <SelectTrigger id="status">
                                                                <SelectValue placeholder="Select status"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    enums.statuses.map((status: {
                                                                        value: string,
                                                                        name: string
                                                                    }) => (
                                                                        <SelectItem key={status.value}
                                                                                    value={status.value.toString()}>{status.name}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>

                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                        </div>

                                        <div className="md:col-span-2">
                                            <FormField
                                                control={form.control}
                                                name="startTime"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Start Time *</FormLabel>
                                                        <FormControl>
                                                            <DateTimePicker
                                                                value={field.value}
                                                                onValueChange={field.onChange}
                                                                disabled={isLoading}
                                                                className="w-full"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        </div>


                                        <div className="md:col-span-4">
                                            <FormLabel>
                                                <h2 className="my-2 text-2xl">Questions</h2>
                                            </FormLabel>

                                            <div className="space-y-2">
                                                {selections.map((selection, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        {/* Lesson Field */}
                                                        <div className="w-full">
                                                            <Label>Lesson</Label>
                                                            <SelectList
                                                                key={`lesson-${subjectId}-${index}`}
                                                                value={selection.lessonId}
                                                                onValueChange={(val) => updateSelection(index, 'lessonId', val!)}
                                                                loadItems={(page, limit, search) =>
                                                                    loadLessons(page, limit, search)
                                                                }
                                                                placeholder="Select a Lesson..."
                                                                className="w-full"
                                                                emptyText={subjectId ? "No Lesson found." : "Select Subject first"}
                                                                disabled={isLoading || !subjectId}
                                                            />
                                                        </div>

                                                        {/* Topic Field */}
                                                        <div className="w-full">
                                                            <Label>Topic</Label>
                                                            <SelectList
                                                                key={`topic-${selection.lessonId}-${index}`}
                                                                value={selection.topicId}
                                                                onValueChange={(val) => updateSelection(index, 'topicId', val!)}
                                                                loadItems={(page, limit, search) =>
                                                                    loadTopics(page, limit, search, selection.lessonId)
                                                                }
                                                                placeholder="Select a Topic..."
                                                                className="w-full"
                                                                emptyText={selection.lessonId ? "No Topic found." : "Select Lesson first"}
                                                                disabled={isLoading || !selection.lessonId}
                                                            />
                                                        </div>

                                                        {/* Question Field */}
                                                        <div className="w-full">
                                                            <Label>Question</Label>
                                                            <SelectList
                                                                key={`question-${selection.topicId}-${index}`}
                                                                value={selection.questionId}
                                                                onValueChange={(val) => updateSelection(index, 'questionId', val!)}
                                                                loadItems={(page, limit, search) =>
                                                                    loadQuestions(page, limit, search, selection.lessonId!, selection.topicId!)
                                                                }
                                                                placeholder="Select a Question..."
                                                                className="w-full"
                                                                emptyText={selection.topicId ? "No Question found." : "Select Topic first"}
                                                                disabled={isLoading || !selection.topicId}
                                                            />
                                                        </div>

                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="icon"
                                                            disabled={isLoading}
                                                            className="mt-6"
                                                            onClick={() => {
                                                                setSelections(prev => {
                                                                    const updated = [...prev];
                                                                    updated.splice(index, 1);

                                                                    // Update form's questionIds
                                                                    const questionIds = updated
                                                                        .map(s => s.questionId)
                                                                        .filter((id): id is number => id !== null);
                                                                    form.setValue('questionIds', questionIds);

                                                                    return updated;
                                                                });
                                                            }}
                                                        >
                                                            <Minus className="h-4 w-4"/>
                                                        </Button>
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    disabled={isLoading}
                                                    onClick={() => {
                                                        setSelections(prev => [...prev, {
                                                            lessonId: null,
                                                            topicId: null,
                                                            questionId: null
                                                        }]);
                                                    }}
                                                >
                                                    <Plus className="h-4 w-4 mr-2"/> Add Question
                                                </Button>
                                            </div>

                                        </div>


                                        <div className="md:col-span-4">

                                            <div className="flex gap-4 pt-4">
                                                <Button
                                                    variant="success"
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="flex-1"
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                                            Creating...
                                                        </>
                                                    ) : (
                                                        'Create Question'
                                                    )}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="info"
                                                    onClick={() => form.reset()}
                                                    disabled={isLoading}
                                                >
                                                    Reset
                                                </Button>
                                                <Button
                                                    variant="warning"
                                                    type="button"
                                                    onClick={() => router.push("./")}
                                                    disabled={isLoading}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>

                                    </div>
                                </form>

                            </Form>

                        </div>

                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Form Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <p>
                                Use this form to create a new academic class. Fill in the class name, select the
                                appropriate segment and status, and optionally assign groups to the class.
                            </p>
                            <p>
                                Fields marked with * are required. Ensure that the class name is unique and descriptive.
                            </p>
                            <p>
                                After creating the class, you can manage its details and assignments from the classes
                                dashboard.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    )

}

export default QuizCreatePage;