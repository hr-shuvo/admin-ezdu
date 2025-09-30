/*eslint-disable @typescript-eslint/no-unused-vars*/

'use client'

import AppSidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { userService } from "@/services/user.service";
import Loading from "@/app/(dashboard)/loading";
import { authService } from "@/services/auth.service";

type Props = {
    children: ReactNode,
}

const DashboardLayoutPage = ({children}: Props) => {
    const {setUser} = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [authorized, setAuthorized] = useState(false);


    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const isLoggedIn = await authService.isLoggedIn();

                if (isLoggedIn) {
                    const user = await userService.currentUser();

                    if (user) {
                        setUser({username: user.username, id: user.id, roles: []});
                        setAuthorized(true);
                    } else {
                        router.replace("/login");
                    }
                } else {
                    router.replace("/login");
                }

            } catch (error) {
                router.replace("/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router, setUser]);

    if (loading || !authorized) {
        return <Loading/>;
    }


    return (
        <>
            <AppSidebar/>

            <main className='w-full'>
                <Navbar/>
                <div className='px-4 h-full'>
                    {children}
                </div>
            </main>
        </>
    )

}

export default DashboardLayoutPage;