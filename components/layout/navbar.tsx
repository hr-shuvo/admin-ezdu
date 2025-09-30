'use client';

import Link from "next/link";
import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumbs from "@/components/layout/breadcrumb";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const {theme, setTheme} = useTheme();
    const [isClient, setClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const handleLogout = () => {
        const logout = async () => {
            try {
                await authService.logout();

                router.push("/login");
            } catch (error) {
                router.push("/login");
            }
        }
        logout();
    };

    return (

        <nav className="p-4 flex items-center justify-between">

            <div className='flex items-center gap-4'>
                <SidebarTrigger className='cursor-pointer'/>
                <Breadcrumbs/>
            </div>


            <div className='flex items-center justify-between gap-4'>
                <Link href="/public">Dashboard</Link>

                <Button variant="outline" size="icon"
                        onClick={() => theme == 'dark' ? setTheme('light') : setTheme('dark')}>
                    <Sun
                        className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
                    <Moon
                        className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://avatars.githubusercontent.com/u/179527795"/>
                            <AvatarFallback>SH</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><User className='h-[1.2rem] w-[1.2rem] mr-2'/> Profile</DropdownMenuItem>
                        <DropdownMenuItem><Settings className='h-[1.2rem] w-[1.2rem] mr-2'/> Settings</DropdownMenuItem>
                        <DropdownMenuItem variant='destructive' onClick={() => handleLogout()}>
                            <LogOut className='h-[1.2rem] w-[1.2rem] mr-2'/>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav>

    )
}

export default Navbar;