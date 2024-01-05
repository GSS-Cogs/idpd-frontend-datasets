import Tag, { TagProps } from "@/components/Tag";

export interface PhaseBannerProps {
  href: string;
  tag: TagProps;
  className?: string;
  attributes?: object;
}

export default function PhaseBanner({
  href,
  tag,
  className,
  attributes,
}: PhaseBannerProps) {
  return (
    <div className={`govuk-phase-banner ${className || ""}`} {...attributes}>
      <p className="govuk-phase-banner__content">
        <Tag
          className={`govuk-phase-banner__content__tag ${tag.className || ""}`}
          {...tag.attributes}
        >
          {tag.children}
        </Tag>
        <span className="govuk-phase-banner__text">
          This is a new service - your{" "}
          <a className="govuk-link" href={href}>
            feedback
          </a>{" "}
          will help us to improve it.
        </span>
      </p>
    </div>
  );
}
