import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  as = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:text-white hover:shadow-lg focus:ring-primary",
    secondary:
      "bg-accent text-white hover:brightness-95 focus:ring-accent",
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

  const Comp = as === "a" ? "a" : "button";
  const type = Comp === "button" ? (props.type || "button") : undefined;
  return (
    <Comp
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      type={type}
      {...props}
    >
      {children}
    </Comp>
  );
}
