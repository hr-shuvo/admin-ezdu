import { Calendar, ChevronDown, ChevronsUp, Home, Inbox, Plus, Projector, Search, Settings, User2 } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub, SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";


const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

const AppSidebar = () => {
    return (
        <Sidebar collapsible="icon" side="left">
            <SidebarHeader className='py-4'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href='/'>
                                <Image src='/vercel.svg' alt='logo' width={20} height={20}/>
                                <span>EzDu</span>
                            </Link>
                        </SidebarMenuButton>

                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator/>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {
                                        item.title ==="Inbox" && (
                                            <SidebarMenuBadge>23</SidebarMenuBadge>
                                        )
                                    }
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Academy</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus/> <span className='sr-only'>Add Class</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/'><Projector/> See All Class</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/'><Plus/> Add Class</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

                <Collapsible defaultOpen={true} className='group/collapsible'>

                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                User Management
                                <ChevronDown
                                    className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180'/>
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>

                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/'><Projector/> See All Users</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/'><Plus/> Manage users</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>

                            </SidebarGroupContent>
                        </CollapsibleContent>

                    </SidebarGroup>

                </Collapsible>


                <SidebarGroup>
                    <SidebarGroupLabel>Nested Items</SidebarGroupLabel>
                    {/*<SidebarGroupAction>*/}
                    {/*    <Plus/> <span className='sr-only'>Add Class</span>*/}
                    {/*</SidebarGroupAction>*/}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/'><Projector/> Add Class</Link>
                                </SidebarMenuButton>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <Link href='/'><Plus/> Add Class</Link>

                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <Link href='/'><Plus/> Add Subject</Link>

                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/'><Projector/> Add Class</Link>
                                </SidebarMenuButton>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <Link href='/'><Plus/> Add Class</Link>

                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <User2/> Shuvo <ChevronsUp className='ml-auto'/>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem>Account</DropdownMenuItem>
                            <DropdownMenuItem>Setting</DropdownMenuItem>
                            <DropdownMenuItem>Sign Out</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenu>

            </SidebarFooter>

        </Sidebar>

    )
}

export default AppSidebar;