'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const TodoList = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className=''>
            <h2 className="text-lg font-medium mb-6">Todo List</h2>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="w-full">
                        <CalendarIcon/>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='p-0 w-auto'>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) =>{
                            setDate(date);
                            setOpen(false);
                        }}
                        className="rounded-lg border"
                    />
                </PopoverContent>
            </Popover>

            <ScrollArea className='max-h-[400px] mt-4 overflow-y-auto'>
                <div className='flex flex-col gap-4'>

                    <Card className='p-4'>
                        <div className='flex items-center gap-4'>
                            <Checkbox id='item1'/>
                            <label htmlFor='item1' className='text-sm text-muted-foreground'>Item 1</label>

                        </div>

                    </Card>
                    <Card className='p-4'>
                        <div className='flex items-center gap-4'>
                            <Checkbox id='item1'/>
                            <label htmlFor='item1' className='text-sm text-muted-foreground'>Item 1</label>

                        </div>

                    </Card>
                    <Card className='p-4'>
                        <div className='flex items-center gap-4'>
                            <Checkbox id='item1'/>
                            <label htmlFor='item1' className='text-sm text-muted-foreground'>Item 1</label>

                        </div>

                    </Card>
                    <Card className='p-4'>
                        <div className='flex items-center gap-4'>
                            <Checkbox id='item1'/>
                            <label htmlFor='item1' className='text-sm text-muted-foreground'>Item 1</label>

                        </div>

                    </Card>
                    <Card className='p-4'>
                        <div className='flex items-center gap-4'>
                            <Checkbox id='item1'/>
                            <label htmlFor='item1' className='text-sm text-muted-foreground'>Item 1</label>

                        </div>

                    </Card>
                    <Card className='p-4'>
                        <div className='flex items-center gap-4'>
                            <Checkbox id='item1'/>
                            <label htmlFor='item1' className='text-sm text-muted-foreground'>Item 1</label>

                        </div>

                    </Card>
                    <Card className='p-4'>
                        <div className='flex items-center gap-4'>
                            <Checkbox id='item1'/>
                            <label htmlFor='item1' className='text-sm text-muted-foreground'>Item 1</label>

                        </div>

                    </Card>
                </div>

            </ScrollArea>

        </div>
    )
}

export default TodoList;