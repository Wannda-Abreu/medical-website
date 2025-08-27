import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-green-700 focus:ring-primary",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-green-600 focus:ring-secondary",
    outline:
      "border border-border text-foreground hover:bg-muted focus:ring-ring",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-red-700 focus:ring-destructive",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
