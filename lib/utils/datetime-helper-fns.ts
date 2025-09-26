import { format } from "date-fns";

export function formatDateTime(date: Date | string, dateFormat = "dd MMM yyyy, HH:mm") {
    const d = typeof date === "string" ? new Date(date) : date;
    return format(d, dateFormat);
}