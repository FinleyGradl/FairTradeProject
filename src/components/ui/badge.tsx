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
          "bg-sage-100 text-sage-700": variant === "secondary",
          "border border-sage/30 text-sage-700": variant === "outline",
          "bg-green-100 text-green-800": variant === "success",
        },
        className
      )}
      {...props}
    />
  );
}
