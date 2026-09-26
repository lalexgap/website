const SITE_URL = "https://alexgap.ca";

type PageMetaProps = {
  title: string;
  path?: string;
  noindex?: boolean;
};

// React 19 hoists <title>/<link>/<meta> rendered here into <head>.
export default function PageMeta({ title, path, noindex }: PageMetaProps) {
  const fullTitle = title
    ? `${title} · Alex Gap`
    : "Alex Gap — Full-stack developer";
  return (
    <>
      <title>{fullTitle}</title>
      {path !== undefined && (
        <link rel="canonical" href={`${SITE_URL}${path}`} />
      )}
      {noindex && <meta name="robots" content="noindex" />}
    </>
  );
}
