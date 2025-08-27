import clsx from "clsx";
import Button from "./Button";

const Card = ({
  variant = "panel",
  className,
  // Props para "panel"
  title,
  description,
  footer,
  children,
  // Props para "profile"
  image,
  name,
  role,
  ctaText = "Ver perfil",
  onCtaClick,
  ctaHref = "#",
}) => {
  const base = clsx(
    "group relative rounded-2xl border border-border bg-card text-card-foreground",
    "shadow-sm transition-all duration-300 hover:shadow-md",
    // halo difuminado solo en hover
    "hover:border-emerald-400/40",
    "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl",
    "after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
    // halo suave (difuminado alrededor del borde)
    "after:blur-[6px] after:[background:radial-gradient(60%_120%_at_50%_-10%,rgba(46,125,50,0.22),transparent_55%)]",
    className
  );

  if (variant === "profile") {
    return (
      <article className={base}>
        <div className="bg-muted rounded-t-2xl h-72 sm:h-80 md:h-96 overflow-hidden flex items-end justify-center">
          {image ? (
            <img
              src={image}
              alt={name || "Miembro del equipo"}
              className="h-[92%] w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : null}
        </div>

        {/* Contenido inferior */}
        <div className="rounded-b-2xl p-6 text-center">
          {name && <h3 className="text-lg md:text-xl font-semibold">{name}</h3>}
          {role && (
            <p className="mt-1 text-sm md:text-base text-muted-foreground">
              {role}
            </p>
          )}

          <div className="mt-4">
            {onCtaClick ? (
              <Button onClick={onCtaClick} size="sm">
                {ctaText}
              </Button>
            ) : (
              <a href={ctaHref}>
                <Button asChild size="sm">
                  <span>{ctaText}</span>
                </Button>
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className={base + " p-6 flex flex-col space-y-4"}>
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      {description && <p className="text-muted-foreground">{description}</p>}

      {children && <div className="flex-1">{children}</div>}

      {footer && (
        <div className="pt-4 border-t border-border text-sm text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
