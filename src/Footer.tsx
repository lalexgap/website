export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center bg-bg-default px-2 pt-1">
      <p className="text-xs text-text-primary">
        This website has been lovingly hand-crafted and self-hosted. Check out
        the{" "}
        <a
          href="https://github.com/lalexgap/website"
          className="text-primary underline"
        >
          source code
        </a>
        .
      </p>
    </footer>
  );
}
