'use client';

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { classService } from "@/services/class.service";
import { showToast } from "@/components/common/toast";
import { enums } from "@/lib/constants/common";
import { useParams, useRouter } from "next/navigation";
import { questionSchema } from "@/schemas/question-schema";
import { Checkbox } from "@/components/ui/checkbox";
import { subjectService } from "@/services/subject.service";
import { lessonService } from "@/services/lesson.service";
import { topicService } from "@/services/topic.service";
import SelectList from "@/components/common/select-list";
import { questionService } from "@/services/question-service";


const QuestionEditPage = () => {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    const [classId, setClassId] = useState<number>();
    const [subjectId, setSubjectId] = useState<number>();
    const [lessonId, setLessonId] = useState<number>();
    const [topicId, setTopicId] = useState<number>();

    const form = useForm<z.infer<typeof questionSchema>>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            name: '',
            questionType: 1,
            passage: '',
            subjectId: undefined,
            lessonId: undefined,
            topicId:undefined,
            explanation: '',
            hint: '',
            marks: 1,
            difficultyLevel: 1,
            options: [
                {name: '', isCorrect: false},
                {name: '', isCorrect: false}
            ],
            status: 0,
        }
    });

    const {fields: optionFields, append, remove} = useFieldArray({
        control: form.control,
        name: "options"
    });

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                if (params.id) {
                    const data = await questionService.get(Number(params.id));

                    form.reset(data);

                    if(data){
                        const subject = await subjectService.get(data.subjectId);
                        setClassId(subject.classId);

                        setSubjectId(data?.subjectId);
                        setLessonId(data?.lessonId);
                    }


                    console.log(data)
                }
            } catch (error) {
                // showToast("Failed to load class data.", "error");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [params.id]);


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

    const loadTopics = async (page: number, limit: number, search?: string | undefined): Promise<any> => {
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



    const onSubmit = async (values: z.infer<typeof questionSchema>) => {
        setLoading(true);

        // console.log(values);
        // return;

        try {
            const result = await questionService.save(values);

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
        }else if(err && err.options && err.options.root && err.options.root.message) {
            msg = err.options.root.message;
        }
        else if(err && err.options && Array.isArray(err.options) && err.options.length > 0) {
            msg = err.options[0].text.message;
        }

        showToast(msg, "error");
    }

    return (

        <div className="p-6">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-2xl">Update Question</CardTitle>
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
                                                    <FormLabel>Question name *</FormLabel>
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
                                            <FormField
                                                name="subjectId"
                                                control={form.control}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Subject *</FormLabel>
                                                        <FormControl>
                                                            <SelectList
                                                                key={classId}
                                                                value={field.value}
                                                                onValueChange={(val) => {
                                                                    field.onChange(val);
                                                                    setSubjectId(val);
                                                                }} // updates the form automatically
                                                                // loadItems={(page, limit, search) => loadSubjects(page, limit, search, classId)}
                                                                loadItems={loadSubjects}
                                                                placeholder="Select a subject..."
                                                                className="w-full"
                                                                emptyText={classId ? "No subjects found." : "Select class first"}
                                                                disabled={isLoading}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                        </div>

                                        <div className="md:col-span-2">
                                            <FormField
                                                name="lessonId"
                                                control={form.control}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Lesson *</FormLabel>
                                                        <FormControl>
                                                            <SelectList
                                                                key={subjectId}
                                                                value={field.value}
                                                                onValueChange={(val) => {
                                                                    field.onChange(val);
                                                                    setLessonId(val);
                                                                }} // updates the form automatically
                                                                // loadItems={(page, limit, search) => loadSubjects(page, limit, search, classId)}
                                                                loadItems={loadLessons}
                                                                placeholder="Select a lesson..."
                                                                className="w-full"
                                                                emptyText={classId ? "No lessons found." : "Select lesson first"}
                                                                disabled={isLoading}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                        </div>

                                        <div className="md:col-span-2">
                                            <FormField
                                                name="topicId"
                                                control={form.control}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Topic *</FormLabel>
                                                        <FormControl>
                                                            <SelectList
                                                                key={lessonId}
                                                                value={field.value}
                                                                onValueChange={(val) => {
                                                                    field.onChange(val);
                                                                    setTopicId(val);
                                                                }} // updates the form automatically
                                                                // loadItems={(page, limit, search) => loadSubjects(page, limit, search, classId)}
                                                                loadItems={loadTopics}
                                                                // placeholder="Select a class..."
                                                                className="w-full"
                                                                emptyText={classId ? "No topics found." : "Select topic first"}
                                                                disabled={isLoading}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                        </div>



                                        <div className="md:col-span-2">
                                            <FormField name="questionType" control={form.control} render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Type *</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(Number(value))}
                                                            value={field.value?.toString()}
                                                        >
                                                            <SelectTrigger id="type">
                                                                <SelectValue placeholder="Select Type"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    enums.questionTypes.map((type: {
                                                                        value: number,
                                                                        name: string
                                                                    }) => (
                                                                        <SelectItem key={type.value}
                                                                                    value={type.value.toString()}>{type.name}</SelectItem>
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

                                        <div className="md:col-span-4">
                                            <FormLabel>
                                                <h1 className="my-2 text-2xl">Options</h1>
                                            </FormLabel>
                                            <div className="space-y-2">
                                                {optionFields.map((option, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <FormField
                                                            control={form.control}
                                                            name={`options.${index}.name`}
                                                            render={({field}) => (
                                                                <FormItem className="w-full">
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            placeholder={`Option ${index + 1}`}
                                                                            type="text"
                                                                            disabled={isLoading}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`options.${index}.isCorrect`}
                                                            render={({field}) => (
                                                                <FormItem className="flex items-center gap-2 p-1">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value}
                                                                            onCheckedChange={(checked: boolean) => field.onChange(checked)}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="">Correct</FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="icon"
                                                            disabled={optionFields.length <= 2 || isLoading}
                                                            onClick={() => remove(index)}
                                                        >
                                                            <Minus className="h-4 w-4"/>
                                                        </Button>

                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => append({name: "", isCorrect: false})}
                                                    disabled={isLoading}
                                                >
                                                    <Plus className="h-4 w-4 mr-2"/> Add Option
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
                                                            Updating...
                                                        </>
                                                    ) : (
                                                        'Update Question'
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

export default QuestionEditPage;