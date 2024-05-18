import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  rightComponent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, rightComponent, ...props }, ref) => {
    return (
      <div className="flex items-center justify-center relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightComponent && (
          <div className="absolute right-2">{rightComponent}</div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
