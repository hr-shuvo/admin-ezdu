'use client';

import React from 'react';
import { Home, ArrowLeft, FileQuestion, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function NotFoundPage() {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const quickLinks = [
        { label: 'Dashboard', href: '/' },
        { label: 'Classes', href: '/classes' },
        { label: 'Subjects', href: '/subjects' },
        { label: 'Lessons', href: '/lessons' },
        { label: 'Quizzes', href: '/quizzes' },
        { label: 'MCQs', href: '/mcqs' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl space-y-4">
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <FileQuestion className="w-20 h-20" />
                        </div>
                        <CardTitle className="text-4xl">404 - Page Not Found</CardTitle>
                        <CardDescription>
                            The page you&apos;re looking for doesn&apos;t exist or has been moved
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Button onClick={handleGoBack} variant="outline" className="flex-1">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Back
                            </Button>
                            <Button onClick={handleGoHome} className="flex-1">
                                <Home className="w-4 h-4 mr-2" />
                                Home Page
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Quick Links</CardTitle>
                        <CardDescription>Navigate to commonly accessed pages</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                            {quickLinks.map((link) => (
                                <Button
                                    key={link.href}
                                    variant="outline"
                                    className="justify-start"
                                    onClick={() => window.location.href = link.href}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Search className="w-5 h-5 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Search our site</p>
                                <p className="text-sm text-muted-foreground">Try searching for what you need</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-start gap-3">
                            <Home className="w-5 h-5 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Visit homepage</p>
                                <p className="text-sm text-muted-foreground">Start from the beginning</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}