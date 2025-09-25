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


const Navbar = () => {
    const {theme, setTheme} = useTheme();
    const [isClient, setClient] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (

        <nav className="p-4 flex items-center justify-between">
            <SidebarTrigger/>

            <div className='flex items-center justify-between gap-4'>
                <Link href="/">Dashboard</Link>

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
                        <DropdownMenuItem variant='destructive'><LogOut
                            className='h-[1.2rem] w-[1.2rem] mr-2'/>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav>

    )
}

export default Navbar;