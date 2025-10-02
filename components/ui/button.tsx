import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        // Default/Primary
        default:
            "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40",

        defaultOutline:
            "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/20 dark:hover:bg-primary/20 dark:focus-visible:ring-primary/40",

        // Success
        success:
            "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-600/20 dark:bg-green-600 dark:hover:bg-green-700 dark:focus-visible:ring-green-600/40",

        successOutline:
            "border-2 border-green-600 text-green-700 bg-transparent hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-green-600/20 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-500/20 dark:focus-visible:ring-green-500/40",

        // Destructive/Danger
        destructive:
            "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600/20 dark:bg-red-600 dark:hover:bg-red-700 dark:focus-visible:ring-red-600/40",

        destructiveOutline:
            "border-2 border-red-600 text-red-700 bg-transparent hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-600/20 dark:text-red-400 dark:border-red-500 dark:hover:bg-red-500/20 dark:focus-visible:ring-red-500/40",

        // Warning
        warning:
            "bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-2 focus-visible:ring-amber-500/20 dark:bg-amber-500 dark:hover:bg-amber-600 dark:focus-visible:ring-amber-500/40",

        warningOutline:
            "border-2 border-amber-500 text-amber-700 bg-transparent hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-500/20 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-amber-500/20 dark:focus-visible:ring-amber-400/40",

        // Info
        info:
            "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600/20 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus-visible:ring-blue-600/40",

        infoOutline:
            "border-2 border-blue-600 text-blue-700 bg-transparent hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600/20 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-blue-500/20 dark:focus-visible:ring-blue-500/40",

        // Secondary
        secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-secondary/20 dark:focus-visible:ring-secondary/40",

        secondaryOutline:
            "border-2 border-secondary text-secondary-foreground bg-transparent hover:bg-secondary/10 focus-visible:ring-2 focus-visible:ring-secondary/20 dark:hover:bg-secondary/20 dark:focus-visible:ring-secondary/40",

        // Outline (Neutral)
        outline:
            "border-2 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/20 dark:bg-transparent dark:border-input dark:hover:bg-accent/50 dark:focus-visible:ring-ring/40",

        // Ghost
        ghost:
            "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-accent/20 dark:hover:bg-accent/50 dark:focus-visible:ring-accent/40",

        // Link
        link:
            "text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40",

      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
