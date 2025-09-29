import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import CardList from "@/components/card-list";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { BadgeCheck, Candy, Citrus, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EditUser from "@/components/edit-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const SingleUserPage = () => {
    return (

        <div>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/public">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>John Doe</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            <div className="mt-4 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/3 space-y-6">
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <h2 className="text-xl font-semibold">User Badges</h2>
                        <div className="flex gap-4 mt-4">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <BadgeCheck size={36}
                                                className="rounded-full bg-blue-500/30 border border-blue-500/50 p-2"/></HoverCardTrigger>
                                <HoverCardContent>
                                    <h2 className="font-bold mb-2">Verified User</h2>
                                    <p className="text-sm text-muted-foreground">This user has been verified by the
                                        admin</p>
                                </HoverCardContent>
                            </HoverCard>

                            <HoverCard>
                                <HoverCardTrigger>
                                    <Shield size={36}
                                            className="rounded-full bg-green-800/30 border border-green-800/50 p-2"/></HoverCardTrigger>
                                <HoverCardContent>
                                    <h2 className="font-bold mb-2">Verified User</h2>
                                    <p className="text-sm text-muted-foreground">This user has been verified by the
                                        admin</p>
                                </HoverCardContent>
                            </HoverCard>

                            <HoverCard>
                                <HoverCardTrigger><Candy size={36}
                                                         className="rounded-full bg-yellow-500/30 border border-yellow-500/50 p-2"/></HoverCardTrigger>
                                <HoverCardContent>
                                    <h2 className="font-bold mb-2">Verified User</h2>
                                    <p className="text-sm text-muted-foreground">This user has been verified by the
                                        admin</p>
                                </HoverCardContent>
                            </HoverCard>

                            <HoverCard>
                                <HoverCardTrigger><Citrus size={36}
                                                          className="rounded-full bg-orange-500/30 border border-blue-orange/50 p-2"/></HoverCardTrigger>
                                <HoverCardContent>
                                    <h2 className="font-bold mb-2">Verified User</h2>
                                    <p className="text-sm text-muted-foreground">This user has been verified by the
                                        admin</p>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                    <div className="bg-primary-foreground p-4 rounded-lg">

                        <div className='flex items-center justify-between'>

                            <h2 className="font-bold mb-2">User Information</h2>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button>Edit User</Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle className="mb-4">Edit User</SheetTitle>
                                        <SheetDescription asChild>
                                            <EditUser/>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>

                        <div className="space-y-4 mt-4">
                            <div className='flex flex-col gap-2 mb-8'>
                                <p className='text-sm text-muted-foreground'>Profile completion</p>
                                <Progress value={36}/>
                            </div>

                            <div className="flex items-center gap-2">
                                <span>Username:</span>
                                <span>john.doe</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Email:</span>
                                <span>john@email.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Phone:</span>
                                <span>+564564685</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Location</span>
                                <span>NY, USA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Role:</span>
                                <Badge>Admin</Badge>
                            </div>


                        </div>
                        <p className='text-sm text-muted-foreground mt-4'>Joined on 2025.5.2</p>


                    </div>


                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <CardList title={"Recent Transaction"}/>

                    </div>

                </div>

                <div className="w-full lg:w-2/3 space-y-6">
                    <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
                        <div className='flex items-center gap-2'>
                            <Avatar className='size-12'>
                                <AvatarImage src='https://avatars.githubusercontent.com/u/179527795'/>
                                <AvatarFallback>HR</AvatarFallback>
                            </Avatar>
                            <h2 className='text-xl font-semibold'>H R Shuvo</h2>

                        </div>
                        <p className='text-sm text-muted-foreground'>
                            asdll alsdjalsd f oasdfjo; asif;oa fadsoifhjadsfhadfhdfaf asd fahsdo;faih
                        </p>
                    </div>
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        Chart
                    </div>

                </div>

            </div>


        </div>
    )
}

export default SingleUserPage