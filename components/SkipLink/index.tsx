export default function SkipLink({
  text = "Skip to main content",
  href,
  className,
  attributes,
}: {
  text?: string;
  href?: string;
  className?: string;
  attributes?: object;
}) {
  return (
    <a
      href={href || "#main-content"}
      className={`govuk-skip-link ${className || ""}`}
      data-module="govuk-skip-link"
      {...attributes}
    >
      {text}
    </a>
  );
}
