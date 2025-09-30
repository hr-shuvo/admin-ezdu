import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import DashboardLayoutPage from "@/app/(dashboard)/dashboard-layout";
type Props = {
    children: ReactNode
}

const DashboardLayout = async ({children}: Props) => {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    return (
        <>
            <SidebarProvider defaultOpen={defaultOpen}>
                <DashboardLayoutPage>{children}</DashboardLayoutPage>
            </SidebarProvider>
        </>
    )
}


export default DashboardLayout;