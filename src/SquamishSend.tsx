import { useEffect, useMemo, useRef, useState } from "react";

type Hold = {
  id: number;
  x: number;
  y: number;
  key: string;
  unstable: boolean;
};

const GAME_DURATION_SECONDS = 30;
const VIEWPORT_UNITS = 24;
const HOLD_KEYS = "ASDFGHJKLQWERTYUIOP".split("");

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomKey() {
  return HOLD_KEYS[Math.floor(Math.random() * HOLD_KEYS.length)];
}

function makeHold(id: number, y: number): Hold {
  return {
    id,
    y,
    x: randomBetween(10, 90),
    key: randomKey(),
    unstable: Math.random() < 0.18,
  };
}

function initialHolds(): Hold[] {
  const holds: Hold[] = [];
  let y = 1.2;

  for (let i = 0; i < 12; i += 1) {
    y += randomBetween(1.2, 2.6);
    holds.push(makeHold(i + 1, y));
  }

  return holds;
}

export default function SquamishSend() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [height, setHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [score, setScore] = useState(0);
  const [stamina, setStamina] = useState(100);
  const [holds, setHolds] = useState<Hold[]>([]);
  const [climberX, setClimberX] = useState(50);
  const [lastEvent, setLastEvent] = useState("Press a hold key (or tap a hold) to climb.");
  const [endReason, setEndReason] = useState<"time" | "stamina" | null>(null);

  const holdIdRef = useRef(13);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const hasEnded = !isRunning && endReason !== null;

  const startGame = () => {
    setIsRunning(true);
    setTimeLeft(GAME_DURATION_SECONDS);
    setHeight(0);
    setMaxHeight(0);
    setScore(0);
    setStamina(100);
    setClimberX(50);
    setEndReason(null);
    setLastEvent("Press a hold key (or tap a hold) to climb.");
    setHolds(initialHolds());
    holdIdRef.current = 13;
  };

  const openGame = () => {
    setIsOpen(true);
    startGame();
  };

  const closeGame = () => {
    setIsOpen(false);
    setIsRunning(false);
    setEndReason(null);
    openButtonRef.current?.focus();
  };

  useEffect(() => {
    const unlocked = window.localStorage.getItem("squamish-send-unlocked") === "true";
    setIsUnlocked(unlocked);

    const onUnlock = () => {
      window.localStorage.setItem("squamish-send-unlocked", "true");
      setIsUnlocked(true);
    };

    window.addEventListener("unlock-squamish-send", onUnlock);
    return () => window.removeEventListener("unlock-squamish-send", onUnlock);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGame();
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isOpen, isRunning]);

  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const drain = window.setInterval(() => {
      setStamina((prev) => Math.max(0, prev - 1.3));
    }, 180);

    return () => window.clearInterval(drain);
  }, [isOpen, isRunning]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setEndReason("time");
    }
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (stamina <= 0 && isRunning) {
      setIsRunning(false);
      setEndReason("stamina");
      setLastEvent("You pumped out and slipped off.");
    }
  }, [stamina, isRunning]);

  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const spawner = window.setInterval(() => {
      setHolds((prev) => {
        const visibleFloor = Math.max(0, height - 4);
        const trimmed = prev.filter((hold) => hold.y >= visibleFloor);
        const targetTop = height + VIEWPORT_UNITS + 3;
        const next = [...trimmed];
        let highestY = next.reduce((acc, hold) => Math.max(acc, hold.y), height);

        while (next.length < 18 || highestY < targetTop) {
          highestY += randomBetween(1.1, 2.9);
          next.push(makeHold(holdIdRef.current, highestY));
          holdIdRef.current += 1;
        }

        return next;
      });
    }, 650);

    return () => window.clearInterval(spawner);
  }, [isOpen, isRunning, height]);

  const reachableHolds = useMemo(() => {
    return holds
      .filter(
        (hold) =>
          hold.y > height + 0.4 &&
          hold.y <= height + 5.8 &&
          Math.abs(hold.x - climberX) <= 36,
      )
      .sort((a, b) => a.y - b.y);
  }, [holds, height, climberX]);

  const activeHint = reachableHolds[0];

  const grabHold = (hold: Hold) => {
    if (!isRunning) return;

    const gainedHeight = Math.max(0.5, hold.y - height);
    const gainedScore = Math.round(gainedHeight * 14);
    const staminaDelta = hold.unstable ? -18 : 20;
    const newHeight = hold.y;

    setHeight(newHeight);
    setClimberX(hold.x);
    setMaxHeight((prev) => Math.max(prev, newHeight));
    setScore((prev) => prev + gainedScore + (hold.unstable ? 0 : 8));
    setStamina((prev) => Math.min(100, Math.max(0, prev + staminaDelta)));
    setLastEvent(
      hold.unstable
        ? `Sketchy hold (${hold.key})! +${gainedScore} score but stamina dropped.`
        : `Locked ${hold.key}. +${gainedScore} score`,
    );

    setHolds((prev) => prev.filter((item) => item.id !== hold.id && item.y >= newHeight - 3));
  };

  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (!HOLD_KEYS.includes(key)) return;

      const target = reachableHolds.find((hold) => hold.key === key);

      if (target) {
        event.preventDefault();
        grabHold(target);
        return;
      }

      setStamina((prev) => Math.max(0, prev - 8));
      setLastEvent(`Missed ${key}. No matching reachable hold.`);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, isRunning, reachableHolds]);

  const viewportBottom = Math.max(0, height - 3.4);
  const viewportTop = viewportBottom + VIEWPORT_UNITS;

  const visibleHolds = useMemo(
    () => holds.filter((hold) => hold.y >= viewportBottom - 1 && hold.y <= viewportTop + 1),
    [holds, viewportBottom, viewportTop],
  );

  const yToPercent = (y: number) => {
    const relative = (y - viewportBottom) / VIEWPORT_UNITS;
    return 100 - Math.min(100, Math.max(0, relative * 100));
  };

  if (!isUnlocked) {
    return null;
  }

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
                  Squamish Send (GIRP-ish)
                </h2>
                <p className="text-sm text-text-muted">Press hold letters to climb. Mistakes burn stamina.</p>
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

            <div className="grid grid-cols-4 gap-2 border-b border-border-muted/80 bg-bg-default/70 px-4 py-3 text-center sm:px-5">
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
              <div>
                <p className="text-xs tracking-wide text-text-muted uppercase">Stamina</p>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/70">
                  <div
                    className="h-full bg-accent transition-[width]"
                    style={{ width: `${Math.max(0, Math.min(100, stamina))}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="px-4 py-4 sm:px-5 sm:py-5">
              <div className="relative h-[390px] overflow-hidden rounded-xl border border-border-muted bg-[radial-gradient(circle_at_22%_12%,#f6f8fb_0,#e3ebf2_36%,#d4e0ea_100%)]">
                <div className="absolute inset-0 bg-[linear-gradient(to_top,transparent_0%,rgba(16,37,55,0.05)_100%)]" />

                {visibleHolds.map((hold) => {
                  const isHint = activeHint?.id === hold.id;

                  return (
                    <button
                      key={hold.id}
                      type="button"
                      onClick={() => grabHold(hold)}
                      disabled={!isRunning}
                      className={`absolute z-10 size-10 -translate-x-1/2 rounded-full border text-xs font-extrabold shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${
                        hold.unstable
                          ? "border-accent/40 bg-accent text-white"
                          : "border-primary/20 bg-primary-light text-white"
                      } ${isHint ? "ring-3 ring-white/80" : ""}`}
                      style={{ left: `${hold.x}%`, top: `${yToPercent(hold.y)}%` }}
                      aria-label={`${hold.unstable ? "Unstable" : "Solid"} hold ${hold.key} at ${hold.y.toFixed(1)} meters`}
                    >
                      {hold.key}
                    </button>
                  );
                })}

                <div
                  className="absolute z-20 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/70 bg-primary text-lg text-white shadow-[0_8px_18px_rgba(16,37,55,0.35)]"
                  style={{ left: `${climberX}%`, top: `${yToPercent(height)}%` }}
                  aria-hidden
                >
                  🧗
                </div>
              </div>

              <p className="mt-3 text-sm text-text-muted">
                {lastEvent}
                {activeHint ? ` Next: ${activeHint.key}` : ""}
              </p>

              {hasEnded ? (
                <div className="mt-4 rounded-xl border border-border-muted bg-bg-default/75 p-4">
                  <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                    {endReason === "stamina" ? "You fell" : "Time's up"}
                  </p>
                  <p className="mt-1 text-sm text-text-primary">
                    Final height: <strong>{height.toFixed(1)}m</strong> · Best height: <strong>{maxHeight.toFixed(1)}m</strong> · Final score:{" "}
                    <strong>{score}</strong>
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
