import {
    BookOpen,
    Calendar,
    ChevronDown,
    ChevronsUp, FileText,
    GraduationCap,
    Home,
    Inbox, ListTree, Notebook,
    Plus,
    Projector,
    Search,
    Settings,
    User2
} from "lucide-react";
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
            <SidebarHeader>
                <SidebarMenu className='py-4'>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href='/'>
                                <Image src='/logo.svg' alt='logo' width={40} height={40}/>
                                <span>EzDu</span>
                            </Link>
                        </SidebarMenuButton>

                    </SidebarMenuItem>

                </SidebarMenu>


                <SidebarSeparator/>
            </SidebarHeader>


            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
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
                                        item.title === "Inbox" && (
                                            <SidebarMenuBadge>23</SidebarMenuBadge>
                                        )
                                    }
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

                <Collapsible defaultOpen={true} className='group/collapsible'>
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Application
                                <ChevronDown
                                    className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180'/>
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>

                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/quizzes'><GraduationCap/>Quizzes</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/questions'><BookOpen/>Questions</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/assignments'><FileText/>Assignments</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/archives'><FileText/>Archives</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                </SidebarMenu>
                            </SidebarGroupContent>


                        </CollapsibleContent>


                    </SidebarGroup>
                </Collapsible>

                <Collapsible defaultOpen={true} className='group/collapsible'>
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Academic Management
                                <ChevronDown
                                    className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180'/>
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>

                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/classes'><GraduationCap/>Class</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/subjects'><BookOpen/>Subject</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/lessons'><Notebook/>Lesson</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/topics'><ListTree/>Topic</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/topic-content'><FileText/>Topic Content</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                </SidebarMenu>
                            </SidebarGroupContent>

                        </CollapsibleContent>
                    </SidebarGroup>

                </Collapsible>


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
                                            <Link href='/users' aria-readonly='true'><Projector/> Users</Link>
                                        </SidebarMenuButton>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href='/users'><Plus/>All Users</Link>

                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href='/users/add'><Plus/> Add / Invite User</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href='/users/suspended'><Plus/> Suspended User</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/users/parmission'><Projector/> Roles & Permissions</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>


                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/'><Projector/>Session / Login Activity</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>

                            </SidebarGroupContent>
                        </CollapsibleContent>

                    </SidebarGroup>
                </Collapsible>

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


//
// <SidebarGroup>
//     <SidebarGroupLabel>Nested Items</SidebarGroupLabel>
//     {/*<SidebarGroupAction>*/}
//     {/*    <Plus/> <span className='sr-only'>Add Class</span>*/}
//     {/*</SidebarGroupAction>*/}
//     <SidebarGroupContent>
//         <SidebarMenu>
//             <SidebarMenuItem>
//                 <SidebarMenuButton asChild>
//                     <Link href='/'><Projector/> Add Class</Link>
//                 </SidebarMenuButton>
//                 <SidebarMenuSub>
//                     <SidebarMenuSubItem>
//                         <SidebarMenuSubButton asChild>
//                             <Link href='/'><Plus/> Add Class</Link>
//
//                         </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                     <SidebarMenuSubItem>
//                         <SidebarMenuSubButton asChild>
//                             <Link href='/'><Plus/> Add Subject</Link>
//
//                         </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                 </SidebarMenuSub>
//             </SidebarMenuItem>
//             <SidebarMenuItem>
//                 <SidebarMenuButton asChild>
//                     <Link href='/'><Projector/> Add Class</Link>
//                 </SidebarMenuButton>
//                 <SidebarMenuSub>
//                     <SidebarMenuSubItem>
//                         <SidebarMenuSubButton asChild>
//                             <Link href='/'><Plus/> Add Class</Link>
//
//                         </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                 </SidebarMenuSub>
//             </SidebarMenuItem>
//         </SidebarMenu>
//
//     </SidebarGroupContent>
//
// </SidebarGroup>

