'use client';

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    username: z.string().min(2, {message: "username must be at least 2 character"}).max(50),
    email: z.email({message: "Invalid email address"}),
    phone: z.string().min(10, {message: "Phone number is required"}),
    location: z.string().min(2).max(15),
    role: z.enum(["admin", "user"]),
});

const EditUser = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "john.doe",
            email: "john@email.com",
            phone: "+1 0544 4555445415",
            location: "NY, Dhaka, BD",
            role: "admin"
        },
    });

    return (
        <div>
            <Form {...form}>
                <form className='space-y-8'>
                    <FormField control={form.control} name='username' render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public user name.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name='email' render={({field}) => (
                        <FormItem>
                            <FormLabel>email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public email.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name='phone' render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="+1580545055 455" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public phone.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name='location' render={({field}) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="address" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public location.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name='role' render={({field}) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                Only verifies user can be admin.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <Button type="submit">Submit</Button>

                </form>
            </Form>
        </div>


    )
}

export default EditUser;