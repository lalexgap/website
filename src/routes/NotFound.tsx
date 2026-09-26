import { Link } from "react-router-dom";
import PageMeta from "../PageMeta";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <PageMeta title="Page not found" noindex />
      <div className="content-card flex w-full flex-col items-center px-6 py-10 text-center sm:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
          Off-piste
        </h1>
        <p className="mt-3 max-w-md text-text-muted">
          There&apos;s nothing at this address. It may have moved, or the link
          might be mistyped.
        </p>
        <Link
          to="/"
          className="button-subtle mt-6 inline-flex items-center px-4 py-2 text-sm font-medium"
        >
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
