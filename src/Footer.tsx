export default function Footer() {
  return (
    <footer className="border-t border-border-muted/80 py-5">
      <div className="site-shell text-center">
        <p className="text-sm text-text-muted">
          This self-hosted website was lovingly hand-crafted by me and a robot.
          Check out the{" "}
          <a href="https://github.com/lalexgap/website" className="text-link">
            source code
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
