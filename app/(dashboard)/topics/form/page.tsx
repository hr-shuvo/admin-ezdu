'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { showToast } from "@/components/common/toast";
import { useRouter } from "next/navigation";
import SelectList from "@/components/common/select-list";
import { classService } from "@/services/class.service";
import { subjectService } from "@/services/subject.service";
import { enums } from "@/lib/constants/common";
import { topicSchema } from "@/schemas/topic-schema";
import { topicService } from "@/services/topic.service";
import { lessonService } from "@/services/lesson.service";
import { useDebounce } from "@/hooks/use-debounce";
import { Textarea } from "@/components/ui/textarea";


const TopicCreatePage = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    const [classId, setClassId] = useState<number>();
    const [subjectId, setSubjectId] = useState<number>();
    const debouncedSubjectId = useDebounce(subjectId, 500);

    const form = useForm<z.infer<typeof topicSchema>>({
        resolver: zodResolver(topicSchema),
        defaultValues: {
            name: '',
            subTitle: '',
            description: '',
            subjectId: undefined,
            lessonId: undefined,
            status: 0,
        }
    });

    // useEffect(() => {
    //     loadClasses(1, 10);
    // }, []);

    const loadClasses = async (page: number, limit: number, search?: string | undefined): Promise<any> => {

        try {
            const result = await classService.getList(page, limit, undefined, undefined, search);
            // console.log('classes: ', result.items);
            // setClasses(result.items);

            return {items: result.items, total: result.totalCount};

        } catch (error) {
            console.log(error);
        }
    };

    const loadSubjects = async (page: number, limit: number, search?: string | undefined): Promise<any> => {
        if (!classId) return { items: [], total: 0 };

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
        if (!subjectId) return { items: [], total: 0 };

        try {
            const result = await lessonService.getList(page, limit, undefined, undefined, search, undefined, debouncedSubjectId);
            // console.log('subjects: ', result.items);
            // setClasses(result.items);

            return {items: result.items, total: result.totalCount};

        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (values: z.infer<typeof topicSchema>) => {
        setLoading(true);

        // console.log(values);
        //
        // setLoading(false);
        // return;

        try {
            const result = await topicService.save(values);
            form.reset();
            showToast(result.message, "success");
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="p-6">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create Topic</CardTitle>
                        <CardDescription>
                            Add a new Topic to the subject database
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="space-y-6">
                            <Form {...form}>
                                <form>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                                        <div className="md:col-span-4">
                                            <FormField name="name" control={form.control} render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Lesson name *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            placeholder="e.g., Alphabet 1"
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>

                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                        </div>

                                        <div className="md:col-span-4">
                                            <FormField name="subTitle" control={form.control} render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Lesson Subtitle</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            placeholder="e.g., Alphabet 1"
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>

                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                        </div>

                                        <div className="md:col-span-4">
                                            <FormField name="description" control={form.control} render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Topic Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            placeholder="e.g., description"
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
                                                        loadItems={loadClasses}
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
                                                                // placeholder="Select a class..."
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
                                                                }}
                                                                loadItems={loadLessons}
                                                                placeholder="Select a lesson..."
                                                                className="w-full"
                                                                emptyText={classId ? "No lesson found." : "Select subject first"}
                                                                disabled={isLoading}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

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

                                            <div className="flex gap-4 pt-4">
                                                <Button
                                                    variant="success"
                                                    onClick={form.handleSubmit(onSubmit)}
                                                    disabled={isLoading}
                                                    className="flex-1"
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                                            Creating...
                                                        </>
                                                    ) : (
                                                        'Create Class'
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
                                Use this form to create a new academic topic. Fill in the topic name, select the
                                appropriate segment and status, and optionally assign groups to the topic.
                            </p>
                            <p>
                                Fields marked with * are required. Ensure that the topic name is unique and
                                descriptive.
                            </p>
                            <p>
                                After creating the topic, you can manage its details and assignments from the classes
                                dashboard.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>


    )

}

export default TopicCreatePage;