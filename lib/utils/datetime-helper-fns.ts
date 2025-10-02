import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function formatDateTime(date: Date | string, dateFormat = "dd MMM yyyy, hh:mm a") {
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dateString = typeof date === "string" ? date : date.toISOString();
    const utcString = dateString.endsWith('Z') ? dateString : dateString + 'Z';
    const localDate = toZonedTime(utcString, localTimeZone);

    return format(localDate, dateFormat);
}