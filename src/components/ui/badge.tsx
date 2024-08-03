import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { twMerge } from "tailwind-merge";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

// const badgePingVariants = cva(
//   "flex items-center space-x-2 text-xs font-medium h-6 px-3 rounded-full ",
//   {
//     variants: {
//       variant: {
//         default: "bg-neutral-100 dark:bg-neutral-950",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// );

// export interface BadgePingProps
//   extends React.HTMLAttributes<HTMLDivElement>,
//     VariantProps<typeof badgePingVariants> {}

// function BadgePing({ children, className, variant, ...props }: BadgePingProps) {
//   return (
//     <div className={cn(badgePingVariants({ variant }), className)} {...props}>
//       {children}
//     </div>
//   );
// }

// export { Badge, badgeVariants, BadgePing, badgePingVariants };
