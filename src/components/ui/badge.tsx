import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-sage text-white": variant === "default",
          "bg-sage-100 text-sage-700 dark:text-sage-300": variant === "secondary",
          "border border-sage/30 text-sage-700 dark:text-sage-300": variant === "outline",
          "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300": variant === "success",
        },
        className
      )}
      {...props}
    />
  );
}
