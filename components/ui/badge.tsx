import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center justify-center w-fit shrink-0 gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none [&>svg]:size-3 [&>svg]:pointer-events-none",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/50",
                success:
                    "border-transparent bg-green-600 text-white hover:bg-green-500 focus-visible:ring-green-600/50",
                outline:
                    "border-input text-foreground hover:bg-accent hover:text-accent-foreground",
                subtle:
                    "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);


function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
