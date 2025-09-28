import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
    trigger: React.ReactNode;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: "destructive" | "default" | "secondary" | "outline";
    onConfirm: () => void;
}

export default function ConfirmDialog({
                                          trigger,
                                          title = "Confirm Action",
                                          description = "Are you sure you want to proceed?",
                                          confirmText = "Confirm",
                                          cancelText = "Cancel",
                                          confirmColor = "destructive",
                                          onConfirm,
                                      }: ConfirmDialogProps) {
    const [open, setOpen] = React.useState(false);

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    const handleTriggerClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(true);
    };

    return (
        <>
            {/* Trigger manually opens the dialog */}
            <span onClick={handleTriggerClick}>{trigger}</span>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                {cancelText}
                            </Button>
                        </DialogClose>
                        <Button variant={confirmColor} onClick={handleConfirm}>
                            {confirmText}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}