import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { getInputDateTimeValue } from "@/lib/utils/datetime-helper-fns";

interface DateTimePickerProps {
    value?: string; // string format "YYYY-MM-DDTHH:mm"
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

export const DateTimePicker = ({ value, onValueChange, disabled, className }: DateTimePickerProps) => {
    const [open, setOpen] = React.useState(false);
    const initialDate = value ? new Date(value) : undefined;
    const [date, setDate] = React.useState<Date | undefined>(initialDate);
    const [time, setTime] = React.useState(initialDate ? initialDate.toISOString().substring(11,16) : "00:00");

    const updateDateTime = (newDate?: Date, newTime?: string) => {
        if (!newDate) return;
        const [h, m] = (newTime || time).split(":").map(Number);
        const combined = new Date(newDate);
        combined.setHours(h, m, 0, 0);
        onValueChange?.(getInputDateTimeValue(combined));
    };

    React.useEffect(() => {
        if (date) updateDateTime(date, time);
    }, [date, time]);

    return (
        <div className={`flex gap-4 ${className ?? ""}`}>
            {/* Date picker */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button type="button" variant="outline" disabled={disabled} className="w-36 justify-between font-normal">
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(d) => {
                            setDate(d);
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>

            {/* Time picker */}
            <Input
                type="time"
                step="60"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={disabled}
                className="w-40"
            />
        </div>
    );
};
