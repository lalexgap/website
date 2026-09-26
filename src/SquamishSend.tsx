import { Suspense, lazy, useCallback, useEffect, useState } from "react";

// Easter egg launcher. Opens the climbing game when someone taps the profile
// photo five times (About page dispatches OPEN_EVENT) or types "climb".
// The game itself is lazy-loaded so it costs nothing until it's found.

export const OPEN_EVENT = "squamish-send:open";

const ClimbGame = lazy(() => import("./ClimbGame"));

export default function SquamishSend() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
      )
        return;
      typed = (typed + e.key.toLowerCase()).slice(-5);
      if (typed === "climb") {
        typed = "";
        setOpen(true);
      }
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!open) return null;
  return (
    <Suspense fallback={null}>
      <ClimbGame onClose={close} />
    </Suspense>
  );
}
