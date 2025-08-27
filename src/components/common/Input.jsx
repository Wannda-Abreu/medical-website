import React from "react";
import clsx from "clsx";

const Input = React.forwardRef(
  (
    {
      label,
      type = "text",
      placeholder = "",
      error,
      icon: Icon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col space-y-1">
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}

        <div
          className={clsx(
            "flex items-center px-3 py-2 rounded-md border bg-input text-foreground focus-within:ring-2 focus-within:ring-ring transition",
            error ? "border-destructive" : "border-border",
            className
          )}
        >
          {Icon && <Icon className="w-5 h-5 text-muted-foreground mr-2" />}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-sm"
            {...props}
          />
        </div>

        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
