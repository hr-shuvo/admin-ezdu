'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2, Building2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import Image from "next/image";

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        organizationCode: ''
    });

    const handleInputChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
            requirements: {
                minLength: password.length >= minLength,
                hasUpperCase,
                hasLowerCase,
                hasNumbers,
                hasSpecialChar
            }
        };
    };

    const passwordValidation = validatePassword(formData.password);

    const handleSubmit = async () => {
        // Validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.organizationCode) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!passwordValidation.isValid) {
            setError('Password does not meet security requirements');
            return;
        }

        if (!acceptTerms) {
            setError('Please accept the Terms of Service and Privacy Policy');
            return;
        }

        setLoading(true);
        setError('');

        try {
            console.log('Register attempt:', {...formData, password: '[HIDDEN]'});
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Add your registration logic here
            // Example: const response = await signUp(formData);

            // Redirect to login with success message
            router.push('/auth/login?message=Registration successful. Please sign in.');
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const PasswordRequirement = ({met, text}: { met: boolean, text: string }) => (
        <div
            className={`flex items-center gap-2 text-xs ${met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
            <CheckCircle2
                className={`h-3 w-3 ${met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}/>
            {text}
        </div>
    );

    return (
        <>
            <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 relative">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold">Create Account</h1>
                    <p className="text-sm text-muted-foreground">Start your journey with us</p>
                </div>
            </div>


            <div className="space-y-6">
                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}


                {/* Full Name */}
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="pl-10"
                            disabled={loading}
                            autoComplete="name"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your work email"
                            className="pl-10"
                            disabled={loading}
                            autoComplete="email"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a secure password"
                            className="pl-10 pr-10"
                            disabled={loading}
                            autoComplete="new-password"
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

                    {/* Password Requirements */}
                    {formData.password && !passwordValidation.isValid && (
                        <Card>
                            <CardContent className="p-3 space-y-1">
                                <PasswordRequirement met={passwordValidation.requirements.minLength}
                                                     text="At least 8 characters"/>
                                <PasswordRequirement met={passwordValidation.requirements.hasUpperCase}
                                                     text="One uppercase letter"/>
                                <PasswordRequirement met={passwordValidation.requirements.hasLowerCase}
                                                     text="One lowercase letter"/>
                                <PasswordRequirement met={passwordValidation.requirements.hasNumbers}
                                                     text="One number"/>
                                <PasswordRequirement met={passwordValidation.requirements.hasSpecialChar}
                                                     text="One special character"/>
                            </CardContent>
                        </Card>
                    )}

                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10"
                            disabled={loading}
                            autoComplete="new-password"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={loading}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground"/>
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground"/>
                            )}
                        </Button>
                    </div>
                </div>


                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={loading || !passwordValidation.isValid}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div
                                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"/>
                            Creating account...
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            Create Account
                            <ArrowRight className="h-4 w-4"/>
                        </div>
                    )}
                </Button>


                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or register with</span>
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 533.5 544.3">
                            <path fill="#4285F4" d="M533.5 278.4c0-17.5-1.5-35-4.6-51.9H272v98.3h147.1c-6.3 33.9-25 62.7-53.5 82.1v68h86.4c50.7-46.7 81.5-115.4 81.5-196.5z"/>
                            <path fill="#34A853" d="M272 544.3c72.4 0 133-23.9 177.3-64.9l-86.4-68c-24 16-54.5 25.4-90.9 25.4-69.8 0-129-47.1-150-110.2h-89.4v69.3C76 486.2 168.4 544.3 272 544.3z"/>
                            <path fill="#FBBC05" d="M122 327.6c-5.1-15-8-31-8-47.6s2.9-32.6 8-47.6v-69.3H32c-18.7 36.9-29.3 78.3-29.3 123s10.6 86.1 29.3 123l90-69.5z"/>
                            <path fill="#EA4335" d="M272 107.3c37.2-.6 70.5 13.1 96.9 38.9l72.7-72.7C404.8 27.6 343.2 0 272 0 168.4 0 76 58.1 32 142.4l90 69.3c21-63.1 80.2-110.2 150-110.2z"/>
                        </svg>
                        Google
                    </Button>

                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.012 4.388 10.992 10.125 11.854v-8.385H7.078v-3.47h3.047V9.41c0-3.007 1.792-4.667 4.533-4.667 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.492 0-1.953.926-1.953 1.874v2.253h3.328l-.532 3.47h-2.796v8.385C19.612 23.065 24 18.085 24 12.073z"/>
                        </svg>
                        Facebook
                    </Button>
                </div>


                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-foreground underline-offset-4 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}