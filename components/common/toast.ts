import { toast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

const bgColors: Record<ToastType, string> = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
};

export function showToast(
    message: string,
    type: ToastType = "info",
    position: "top-right" | "top-left" | "bottom-right" | "bottom-left" = "top-right",
    duration: number = 3000 // default 3 seconds
) {
    toast(message, {
        position,
        duration,
        className: `${bgColors[type]} px-4 py-2 rounded-md shadow-md`,
    });
}
