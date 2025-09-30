import { toast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

const colors: Record<ToastType, { bg: string; text: string }> = {
    success: { bg: "#22c55e", text: "#ffffff" },
    error: { bg: "#ef4444", text: "#ffffff" },
    warning: { bg: "#eab308", text: "#000000" },
    info: { bg: "#3b82f6", text: "#ffffff" },
};

export function showToast(
    message: string,
    type: ToastType = "info",
    position: "top-right" | "top-left" | "bottom-right" | "bottom-left" = "top-right",
    duration: number = 3000
) {
    toast(message, {
        position,
        duration,
        style: {
            background: colors[type].bg,
            color: colors[type].text,
            padding: "1rem",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        },
    });
}