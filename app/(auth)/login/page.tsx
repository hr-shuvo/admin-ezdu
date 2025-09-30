'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

const LoginPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const {setUser} = useAuthStore();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "admin@example.com",
            password: "123456"
        }
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setLoading(true);
        setError('');

        try {
            const result = await authService.login(values);

            setUser({
                id: result.id,
                username: result.username,
                roles: result.roles ?? []
            });

            router.push("/");
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message ?? "Login failed";
            setError(errorMsg)
        } finally {
            setLoading(false);
        }

    }


    return (
        <>
            <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 relative">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        fill
                        style={{objectFit: "contain"}}
                    />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold">Welcome Back</h1>
                    <p className="text-sm text-muted-foreground">Sign in to your account</p>
                </div>
            </div>

            <div className="space-y-6 zoom-in-10">
                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username/Email</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="Enter username or email"
                                                className="pl-10"
                                                disabled={loading}
                                                autoComplete="email"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
                                        <Link
                                            href="/auth/forgot-password"
                                            className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                                            <Input

                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                className="pl-10 pr-10"
                                                // disabled={loading}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={loading}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-muted-foreground"/>
                                                ) : (
                                                    <Eye className="h-4 w-4 text-muted-foreground"/>
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />


                        <FormItem>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                                    disabled={loading}
                                />
                                <Label htmlFor="remember" className="text-sm font-normal">
                                    Keep me signed in
                                </Label>
                            </div>
                        </FormItem>


                        <Button
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div
                                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"/>
                                    Signing in...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    Sign in
                                    <ArrowRight className="h-4 w-4"/>
                                </div>
                            )}
                        </Button>


                    </form>
                </Form>


                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 533.5 544.3">
                            <path fill="#4285F4"
                                  d="M533.5 278.4c0-17.5-1.5-35-4.6-51.9H272v98.3h147.1c-6.3 33.9-25 62.7-53.5 82.1v68h86.4c50.7-46.7 81.5-115.4 81.5-196.5z"/>
                            <path fill="#34A853"
                                  d="M272 544.3c72.4 0 133-23.9 177.3-64.9l-86.4-68c-24 16-54.5 25.4-90.9 25.4-69.8 0-129-47.1-150-110.2h-89.4v69.3C76 486.2 168.4 544.3 272 544.3z"/>
                            <path fill="#FBBC05"
                                  d="M122 327.6c-5.1-15-8-31-8-47.6s2.9-32.6 8-47.6v-69.3H32c-18.7 36.9-29.3 78.3-29.3 123s10.6 86.1 29.3 123l90-69.5z"/>
                            <path fill="#EA4335"
                                  d="M272 107.3c37.2-.6 70.5 13.1 96.9 38.9l72.7-72.7C404.8 27.6 343.2 0 272 0 168.4 0 76 58.1 32 142.4l90 69.3c21-63.1 80.2-110.2 150-110.2z"/>
                        </svg>
                        Google
                    </Button>

                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#1877F2"
                                  d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.012 4.388 10.992 10.125 11.854v-8.385H7.078v-3.47h3.047V9.41c0-3.007 1.792-4.667 4.533-4.667 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.492 0-1.953.926-1.953 1.874v2.253h3.328l-.532 3.47h-2.796v8.385C19.612 23.065 24 18.085 24 12.073z"/>
                        </svg>
                        Facebook
                    </Button>


                </div>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/register"
                            className="font-medium text-foreground underline-offset-4 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
