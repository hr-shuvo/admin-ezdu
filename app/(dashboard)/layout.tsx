import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/sidebar";
import { cookies } from "next/headers";
import Navbar from "@/components/layout/navbar";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const DashboardLayout = async ({children}: Props) => {

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"


    return (
        <>
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar/>

                <main className='w-full'>
                    <Navbar/>
                    <div className='px-4'>
                        {children}
                    </div>
                </main>


            </SidebarProvider>


        </>


    )
}


export default DashboardLayout;