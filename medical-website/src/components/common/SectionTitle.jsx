export default function SectionTitle({ title, subtitle, className = "" }) {
  return (
    <div className={`text-center max-w-2xl mx-auto mb-12 ${className}`}>
      {subtitle && (
        <p className="text-sm uppercase tracking-wider text-primary mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
    </div>
  );
}
