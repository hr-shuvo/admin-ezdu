import { toast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

const colors: Record<ToastType, { bg: string; text: string; border: string }> = {
    success: {
        bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        text: "#ffffff",
        border: "#059669"
    },
    error: {
        bg: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
        text: "#ffffff",
        border: "#dc2626"
    },
    warning: {
        bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        text: "#ffffff",
        border: "#d97706"
    },
    info: {
        bg: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
        text: "#ffffff",
        border: "#2563eb"
    },
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
            padding: "1rem 1.25rem",
            borderRadius: "0.5rem",
            border: `1px solid ${colors[type].border}`,
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            fontSize: "0.875rem",
            fontWeight: "500",
            lineHeight: "1.5",
            backdropFilter: "blur(8px)",
        },
    });
}