import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-700 text-white hover:bg-primary-900 shadow-sm",
        secondary:
          "bg-primary-100 text-primary-900 hover:bg-primary-500 dark:bg-primary-900 dark:text-primary-500 dark:hover:bg-primary-700",
        outline:
          "border border-border bg-background hover:bg-primary-100 dark:hover:bg-primary-900",
        ghost: "hover:bg-primary-100 dark:hover:bg-primary-900",
        danger: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Button = ({ className, variant, size, children, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
