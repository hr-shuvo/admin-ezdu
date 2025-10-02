'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { classSchema } from "@/schemas/classSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { classService } from "@/services/class.service";
import { showToast } from "@/components/common/toast";
import { enums } from "@/lib/constants/common";
import { useRouter } from "next/navigation";


const ClassCreatePage = () => {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof classSchema>>({
        resolver: zodResolver(classSchema),
        defaultValues: {
            name: '',
            status: 0,
            segmentId: undefined,
            groups: []
        }
    });

    const onSubmit = async (values: z.infer<typeof classSchema>) => {
        setLoading(true);

        try {
            const result = await classService.save(values);
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
                        <CardTitle className="text-2xl">Create Academic Class</CardTitle>
                        <CardDescription>
                            Add a new class to the academic system
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
                                                    <FormLabel>Class name *</FormLabel>
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
                                            <FormField
                                                name="segmentId"
                                                control={form.control}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Segment *</FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                key={field.value}
                                                                onValueChange={(value) => field.onChange(Number(value))}
                                                                value={field.value !== undefined ? field.value.toString() : undefined}
                                                                disabled={isLoading}
                                                            >
                                                                <SelectTrigger id="segmentId">
                                                                    <SelectValue placeholder="Select segment"/>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {
                                                                        enums.availableSegments.map((segment: {
                                                                            value: number,
                                                                            name: string
                                                                        }) => (
                                                                            <SelectItem
                                                                                key={segment.value}
                                                                                value={segment.value.toString()}
                                                                            >
                                                                                {segment.name}
                                                                            </SelectItem>
                                                                        ))
                                                                    }
                                                                </SelectContent>
                                                            </Select>
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
                                            <FormField
                                                name="groups"
                                                control={form.control}
                                                render={({field}) => {
                                                    const selectedGroups: string[] = (field.value || []).map(String);

                                                    const toggleGroup = (groupId: string) => {
                                                        if (selectedGroups.includes(groupId)) {
                                                            field.onChange(selectedGroups.filter((id) => id !== groupId));
                                                        } else {
                                                            field.onChange([...selectedGroups, groupId]);
                                                        }
                                                    };

                                                    return (
                                                        <FormItem>
                                                            <FormLabel>Groups</FormLabel>
                                                            <FormControl>
                                                                <div className="space-y-2">
                                                                    {/* Selected Groups */}
                                                                    <div
                                                                        className="border rounded-lg p-3 min-h-[100px]">
                                                                        {selectedGroups.length > 0 ? (
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {selectedGroups.map((groupId) => {
                                                                                    const group = enums.availableGroups.find((g) => g.value === groupId);
                                                                                    return (
                                                                                        <Badge
                                                                                            key={groupId}
                                                                                            variant="secondary"
                                                                                            className="flex items-center gap-1 px-3 py-1 text-sm"
                                                                                        >
                                                                                            <span>{group?.name || `Group ${groupId}`}</span>
                                                                                            <button
                                                                                                type="button"
                                                                                                onClick={() => toggleGroup(groupId)}
                                                                                                className="ml-1 text-red-500 hover:text-red-700 cursor-pointer"
                                                                                            >
                                                                                                ×
                                                                                            </button>
                                                                                        </Badge>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        ) : (
                                                                            <p className="text-sm text-muted-foreground">
                                                                                No groups selected
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    {/* Group Buttons */}
                                                                    <div
                                                                        className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                                        {enums.availableGroups.map((group: {
                                                                            value: string,
                                                                            name: string
                                                                        }) => (
                                                                            <Button
                                                                                key={group.value}
                                                                                type="button"
                                                                                variant={
                                                                                    selectedGroups.includes(group.value) ? "default" : "outline"
                                                                                }
                                                                                size="sm"
                                                                                onClick={() => toggleGroup(group.value)}
                                                                                className="w-full"
                                                                            >
                                                                                {group.name}
                                                                            </Button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                            <FormDescription>
                                                                Optional: Select one or more groups
                                                            </FormDescription>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
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

export default ClassCreatePage;