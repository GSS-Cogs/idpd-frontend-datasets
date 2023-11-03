export interface TagProps {
  children: React.ReactNode;
  className?: string;
  attributes?: object;
}

export default function Tag({ children, className, attributes }: TagProps) {
  return (
    <strong className={`govuk-tag ${className || ""}`} {...attributes}>
      {children}
    </strong>
  );
}
