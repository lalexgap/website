import { useEffect, useMemo, useRef, useState } from "react";

type Hold = {
  id: number;
  x: number;
  y: number;
  kind: "good" | "bad";
};

const GAME_DURATION_SECONDS = 30;
const VIEWPORT_UNITS = 24;
const BAD_HOLD_CHANCE = 0.22;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makeHold(id: number, y: number): Hold {
  return {
    id,
    y,
    x: randomBetween(12, 88),
    kind: Math.random() < BAD_HOLD_CHANCE ? "bad" : "good",
  };
}

function initialHolds(): Hold[] {
  const holds: Hold[] = [];
  let y = 1.8;

  for (let i = 0; i < 10; i += 1) {
    y += randomBetween(1.4, 2.8);
    holds.push(makeHold(i + 1, y));
  }

  return holds;
}

export default function SquamishSend() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [height, setHeight] = useState(0);
  const [score, setScore] = useState(0);
  const [holds, setHolds] = useState<Hold[]>([]);
  const [lastEvent, setLastEvent] = useState("Tap a hold above you to start climbing.");
  const [maxHeight, setMaxHeight] = useState(0);

  const holdIdRef = useRef(11);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const hasEnded = !isRunning && timeLeft === 0;

  const startGame = () => {
    setIsRunning(true);
    setTimeLeft(GAME_DURATION_SECONDS);
    setHeight(0);
    setScore(0);
    setMaxHeight(0);
    setLastEvent("Tap a hold above you to start climbing.");
    setHolds(initialHolds());
    holdIdRef.current = 11;
  };

  const openGame = () => {
    setIsOpen(true);
    startGame();
  };

  const closeGame = () => {
    setIsOpen(false);
    setIsRunning(false);
    openButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGame();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isOpen, isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!isOpen || !isRunning) {
      return;
    }

    const spawner = window.setInterval(() => {
      setHolds((prev) => {
        const visibleFloor = Math.max(0, height - 4);
        const trimmed = prev.filter((hold) => hold.y >= visibleFloor);
        const targetTop = height + VIEWPORT_UNITS + 2;
        const next = [...trimmed];
        let highestY = next.reduce((acc, hold) => Math.max(acc, hold.y), height);

        while (next.length < 14 || highestY < targetTop) {
          highestY += randomBetween(1.4, 3.3);
          next.push(makeHold(holdIdRef.current, highestY));
          holdIdRef.current += 1;
        }

        return next;
      });
    }, 650);

    return () => window.clearInterval(spawner);
  }, [isOpen, isRunning, height]);

  const handleHoldClick = (hold: Hold) => {
    if (!isRunning) {
      return;
    }

    if (hold.kind === "good") {
      const gainedHeight = Math.max(0.6, hold.y - height);
      const gainedScore = Math.round(gainedHeight * 12);
      const newHeight = hold.y;

      setHeight(newHeight);
      setMaxHeight((prev) => Math.max(prev, newHeight));
      setScore((prev) => prev + gainedScore);
      setLastEvent(`Solid move. +${gainedScore} points`);
      setHolds((prev) => prev.filter((item) => item.id !== hold.id && item.y >= newHeight - 3));
      return;
    }

    const droppedHeight = Math.max(0, height - 1.6);
    setHeight(droppedHeight);
    setScore((prev) => Math.max(0, prev - 15));
    setLastEvent("Bad hold! -15 points");
    setHolds((prev) => prev.filter((item) => item.id !== hold.id && item.y >= droppedHeight - 3));
  };

  const viewportBottom = Math.max(0, height - 3);
  const viewportTop = viewportBottom + VIEWPORT_UNITS;

  const visibleHolds = useMemo(
    () => holds.filter((hold) => hold.y >= viewportBottom - 1 && hold.y <= viewportTop + 1),
    [holds, viewportBottom, viewportTop],
  );

  const yToPercent = (y: number) => {
    const relative = (y - viewportBottom) / VIEWPORT_UNITS;
    return 100 - Math.min(100, Math.max(0, relative * 100));
  };

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        onClick={openGame}
        className="button-subtle fixed right-4 bottom-4 z-40 flex items-center gap-2 px-3 py-2 text-sm font-semibold shadow-[0_8px_20px_rgba(16,37,55,0.2)] sm:right-6 sm:bottom-6"
        aria-haspopup="dialog"
        aria-controls="squamish-send-modal"
        aria-label="Open Squamish Send climbing mini-game"
      >
        <span aria-hidden>🧗</span>
        <span>Climb</span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="squamish-send-title"
          id="squamish-send-modal"
        >
          <div className="content-card w-full max-w-xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-border-muted/80 px-4 py-3 sm:px-5">
              <div>
                <h2 id="squamish-send-title" className="text-lg font-semibold text-text-primary sm:text-xl">
                  Squamish Send
                </h2>
                <p className="text-sm text-text-muted">Find good holds and climb for 30 seconds.</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="button-subtle px-3 py-1.5 text-xs font-semibold tracking-wide uppercase"
                onClick={closeGame}
                aria-label="Close Squamish Send mini-game"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 border-b border-border-muted/80 bg-bg-default/70 px-4 py-3 text-center sm:px-5">
              <div>
                <p className="text-xs tracking-wide text-text-muted uppercase">Time</p>
                <p className="text-lg font-semibold text-text-primary">{timeLeft}s</p>
              </div>
              <div>
                <p className="text-xs tracking-wide text-text-muted uppercase">Height</p>
                <p className="text-lg font-semibold text-text-primary">{height.toFixed(1)}m</p>
              </div>
              <div>
                <p className="text-xs tracking-wide text-text-muted uppercase">Score</p>
                <p className="text-lg font-semibold text-text-primary">{score}</p>
              </div>
            </div>

            <div className="px-4 py-4 sm:px-5 sm:py-5">
              <div className="relative h-[390px] overflow-hidden rounded-xl border border-border-muted bg-[radial-gradient(circle_at_22%_12%,#f6f8fb_0,#e3ebf2_36%,#d4e0ea_100%)]">
                <div className="absolute inset-0 bg-[linear-gradient(to_top,transparent_0%,rgba(16,37,55,0.05)_100%)]" />

                {visibleHolds.map((hold) => (
                  <button
                    key={hold.id}
                    type="button"
                    onClick={() => handleHoldClick(hold)}
                    disabled={!isRunning}
                    className={`absolute z-10 size-9 -translate-x-1/2 rounded-full border text-xs font-bold shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${
                      hold.kind === "good"
                        ? "border-primary/20 bg-primary-light text-white hover:bg-primary"
                        : "border-accent/40 bg-accent text-white hover:brightness-95"
                    }`}
                    style={{ left: `${hold.x}%`, top: `${yToPercent(hold.y)}%` }}
                    aria-label={
                      hold.kind === "good"
                        ? `Good hold at ${hold.y.toFixed(1)} meters`
                        : `Bad hold at ${hold.y.toFixed(1)} meters`
                    }
                  >
                    {hold.kind === "good" ? "O" : "X"}
                  </button>
                ))}

                <div
                  className="absolute z-20 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/70 bg-accent text-lg shadow-[0_8px_18px_rgba(16,37,55,0.35)]"
                  style={{ left: "50%", top: `${yToPercent(height)}%` }}
                  aria-hidden
                >
                  🧗
                </div>
              </div>

              <p className="mt-3 text-sm text-text-muted">{lastEvent}</p>

              {hasEnded ? (
                <div className="mt-4 rounded-xl border border-border-muted bg-bg-default/75 p-4">
                  <p className="text-sm font-semibold tracking-wide text-primary uppercase">Time's up</p>
                  <p className="mt-1 text-sm text-text-primary">
                    Final height: <strong>{height.toFixed(1)}m</strong> · Best height:{" "}
                    <strong>{maxHeight.toFixed(1)}m</strong> · Final score: <strong>{score}</strong>
                  </p>
                  <button
                    type="button"
                    onClick={startGame}
                    className="mt-3 rounded-full border border-primary/20 bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label="Restart Squamish Send mini-game"
                  >
                    Restart
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
