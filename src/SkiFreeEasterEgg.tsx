import { useCallback, useEffect, useRef, useState } from "react";

type ObstacleKind = "tree" | "rock";

type Obstacle = {
  id: number;
  x: number;
  y: number;
  size: number;
  kind: ObstacleKind;
};

const UNLOCK_KEY = "skifree-easter-egg-unlocked";
const LEGACY_UNLOCK_KEY = "squamish-send-unlocked";
const PLAYER_Y = 78;
const MIN_X = 8;
const MAX_X = 92;
const MIN_SPEED = 24;
const MAX_SPEED = 56;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function SkiFreeEasterEgg() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.localStorage.getItem(UNLOCK_KEY) === "true" ||
      window.localStorage.getItem(LEGACY_UNLOCK_KEY) === "true"
    );
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasCrashed, setHasCrashed] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [speed, setSpeed] = useState(MIN_SPEED);
  const [status, setStatus] = useState("Tap Start to carve downhill.");
  const [playerX, setPlayerX] = useState(50);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const restartButtonRef = useRef<HTMLButtonElement>(null);

  const inputRef = useRef({ left: false, right: false });
  const rafRef = useRef<number | null>(null);
  const obstacleIdRef = useRef(1);
  const lastFrameRef = useRef<number | null>(null);
  const spawnElapsedRef = useRef(0);
  const speedRef = useRef(MIN_SPEED);
  const scoreRef = useRef(0);
  const playerXRef = useRef(50);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const jumpUntilRef = useRef(0);
  const jumpActiveRef = useRef(false);

  const setUnlocked = () => {
    window.localStorage.setItem(UNLOCK_KEY, "true");
    window.localStorage.setItem(LEGACY_UNLOCK_KEY, "true");
    setIsUnlocked(true);
  };

  const stopRun = (didCrash: boolean) => {
    setIsRunning(false);
    setHasCrashed(didCrash);
    inputRef.current.left = false;
    inputRef.current.right = false;
    if (didCrash) {
      setStatus("Crash! Watch for trees and rocks.");
    } else {
      setStatus("Run ended.");
    }
  };

  const spawnObstacle = () => {
    const kind: ObstacleKind = Math.random() < 0.6 ? "tree" : "rock";
    const size =
      kind === "tree" ? randomBetween(4.2, 5.5) : randomBetween(3.4, 4.8);
    const x = randomBetween(MIN_X, MAX_X);

    obstaclesRef.current = [
      ...obstaclesRef.current,
      { id: obstacleIdRef.current, x, y: 110, size, kind },
    ];
    obstacleIdRef.current += 1;
  };

  const startRun = () => {
    setIsRunning(true);
    setHasCrashed(false);
    setScore(0);
    setSpeed(MIN_SPEED);
    setStatus("Carving.");
    setPlayerX(50);
    setIsJumping(false);
    setObstacles([]);

    playerXRef.current = 50;
    speedRef.current = MIN_SPEED;
    scoreRef.current = 0;
    obstaclesRef.current = [];
    spawnElapsedRef.current = 0;
    lastFrameRef.current = null;
    jumpUntilRef.current = 0;
  };

  const openGame = () => {
    setIsOpen(true);
  };

  const closeGame = () => {
    setIsOpen(false);
    setIsRunning(false);
    setHasCrashed(false);
    setStatus("Tap Start to carve downhill.");
    inputRef.current.left = false;
    inputRef.current.right = false;
    openButtonRef.current?.focus();
  };

  const triggerJump = useCallback(() => {
    if (!isRunning) return;
    const now = performance.now();
    jumpUntilRef.current = now + 460;
    if (!jumpActiveRef.current) {
      jumpActiveRef.current = true;
      setIsJumping(true);
    }
    setStatus("Jump!");
  }, [isRunning]);

  useEffect(() => {
    const onUnlock = () => setUnlocked();
    window.addEventListener("unlock-squamish-send", onUnlock);
    window.addEventListener("unlock-skifree-easter-egg", onUnlock);

    return () => {
      window.removeEventListener("unlock-squamish-send", onUnlock);
      window.removeEventListener("unlock-skifree-easter-egg", onUnlock);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (hasCrashed) {
      restartButtonRef.current?.focus();
    }
  }, [hasCrashed]);

  useEffect(() => {
    if (!isOpen || hasCrashed) return;
    if (!isRunning) {
      startButtonRef.current?.focus();
    }
  }, [isOpen, hasCrashed, isRunning]);

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeGame();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!isRunning) return;

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        event.preventDefault();
        inputRef.current.left = true;
      }
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        event.preventDefault();
        inputRef.current.right = true;
      }
      if (event.key === " ") {
        event.preventDefault();
        triggerJump();
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        inputRef.current.left = false;
      }
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        inputRef.current.right = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [isOpen, isRunning, triggerJump]);

  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const tick = (time: number) => {
      if (!isOpen || !isRunning) return;
      const last = lastFrameRef.current ?? time;
      const dt = clamp((time - last) / 1000, 0, 0.05);
      lastFrameRef.current = time;

      const steer =
        (inputRef.current.left ? -1 : 0) + (inputRef.current.right ? 1 : 0);
      if (steer !== 0) {
        playerXRef.current = clamp(
          playerXRef.current + steer * 52 * dt,
          MIN_X,
          MAX_X,
        );
      }

      speedRef.current = clamp(
        speedRef.current + 4.6 * dt,
        MIN_SPEED,
        MAX_SPEED,
      );
      scoreRef.current += speedRef.current * dt * 9;
      spawnElapsedRef.current += dt;

      const spawnInterval = clamp(0.62 - speedRef.current * 0.007, 0.2, 0.62);
      while (spawnElapsedRef.current >= spawnInterval) {
        spawnElapsedRef.current -= spawnInterval;
        spawnObstacle();
      }

      obstaclesRef.current = obstaclesRef.current
        .map((obstacle) => ({
          ...obstacle,
          y: obstacle.y - speedRef.current * dt,
        }))
        .filter((obstacle) => obstacle.y > -16);

      const jumping = time < jumpUntilRef.current;
      if (jumping !== jumpActiveRef.current) {
        jumpActiveRef.current = jumping;
        setIsJumping(jumping);
        if (!jumping) setStatus("Carving.");
      }

      if (!jumping) {
        const hitObstacle = obstaclesRef.current.some((obstacle) => {
          const xHit =
            Math.abs(obstacle.x - playerXRef.current) < obstacle.size + 1.6;
          const yHit = Math.abs(obstacle.y - PLAYER_Y) < obstacle.size + 2.2;
          return xHit && yHit;
        });

        if (hitObstacle) {
          const finalScore = Math.floor(scoreRef.current);
          setBestScore((prev) => Math.max(prev, finalScore));
          setScore(finalScore);
          stopRun(true);
          setObstacles(obstaclesRef.current);
          setPlayerX(playerXRef.current);
          setSpeed(speedRef.current);
          return;
        }
      } else {
        setIsJumping(true);
      }

      const liveScore = Math.floor(scoreRef.current);
      setScore(liveScore);
      setBestScore((prev) => Math.max(prev, liveScore));
      setSpeed(speedRef.current);
      setPlayerX(playerXRef.current);
      setObstacles(obstaclesRef.current);

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isOpen, isRunning]);

  if (!isUnlocked) return null;

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        onClick={openGame}
        className="button-subtle fixed right-4 bottom-4 z-40 flex items-center gap-2 px-3 py-2 text-sm font-semibold shadow-[0_8px_20px_rgba(16,37,55,0.2)] sm:right-6 sm:bottom-6"
        aria-haspopup="dialog"
        aria-controls="skifree-easter-egg-modal"
        aria-label="Open SkiFree-style mini-game"
      >
        <span aria-hidden>⛷️</span>
        <span>Ski</span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="skifree-easter-egg-title"
          id="skifree-easter-egg-modal"
        >
          <div className="content-card w-full max-w-xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-border-muted/80 px-4 py-3 sm:px-5">
              <div>
                <h2
                  id="skifree-easter-egg-title"
                  className="text-lg font-semibold text-text-primary sm:text-xl"
                >
                  SkiFree Easter Egg
                </h2>
                <p className="text-sm text-text-muted">
                  Arrow keys or A/D to carve, Space to jump.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="button-subtle px-3 py-1.5 text-xs font-semibold tracking-wide uppercase"
                onClick={closeGame}
                aria-label="Close SkiFree mini-game"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 border-b border-border-muted/80 bg-bg-default/70 px-4 py-3 text-center sm:px-5">
              <div>
                <p className="text-xs tracking-wide text-text-muted uppercase">
                  Score
                </p>
                <p className="text-lg font-semibold text-text-primary">
                  {score}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-wide text-text-muted uppercase">
                  Best
                </p>
                <p className="text-lg font-semibold text-text-primary">
                  {bestScore}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-wide text-text-muted uppercase">
                  Speed
                </p>
                <p className="text-lg font-semibold text-text-primary">
                  {Math.round(speed)} km/h
                </p>
              </div>
            </div>

            <div className="px-4 py-4 sm:px-5 sm:py-5">
              <div className="relative h-[390px] overflow-hidden rounded-xl border border-border-muted bg-[radial-gradient(circle_at_20%_8%,#ffffff_0%,#eff5fa_34%,#d9e4ee_100%)]">
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.35),rgba(16,37,55,0.05))]" />
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(120deg,rgba(255,255,255,0.85)_1px,transparent_1px)] [background-size:28px_28px]" />

                {obstacles.map((obstacle) => (
                  <div
                    key={obstacle.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${obstacle.x}%`, top: `${obstacle.y}%` }}
                    aria-hidden
                  >
                    {obstacle.kind === "tree" ? (
                      <div
                        className="flex items-center justify-center rounded-full border border-primary/20 bg-primary text-white shadow-sm"
                        style={{
                          width: `${obstacle.size * 2.6}px`,
                          height: `${obstacle.size * 2.6}px`,
                        }}
                      >
                        🌲
                      </div>
                    ) : (
                      <div
                        className="rounded-full border border-primary/10 bg-slate-500 shadow-sm"
                        style={{
                          width: `${obstacle.size * 2.2}px`,
                          height: `${obstacle.size * 2.2}px`,
                        }}
                      />
                    )}
                  </div>
                ))}

                <div
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 text-3xl transition-transform ${
                    isJumping ? "-translate-y-9 scale-110" : ""
                  }`}
                  style={{ left: `${playerX}%`, top: `${PLAYER_Y}%` }}
                  aria-hidden
                >
                  ⛷️
                </div>

                {!isRunning && !hasCrashed ? (
                  <div className="absolute inset-x-4 top-4 rounded-lg border border-border-muted/80 bg-bg-default/85 px-3 py-2 text-sm text-text-primary">
                    Use keyboard or tap controls below to dodge obstacles.
                  </div>
                ) : null}
              </div>

              <p className="mt-3 text-sm text-text-muted">{status}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {!isRunning && !hasCrashed ? (
                  <button
                    ref={startButtonRef}
                    type="button"
                    onClick={startRun}
                    className="rounded-full border border-primary/20 bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Start Run
                  </button>
                ) : null}

                {hasCrashed ? (
                  <button
                    ref={restartButtonRef}
                    type="button"
                    onClick={startRun}
                    className="rounded-full border border-primary/20 bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label="Restart SkiFree mini-game"
                  >
                    Restart
                  </button>
                ) : null}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:max-w-sm">
                <button
                  type="button"
                  className="button-subtle px-4 py-2 text-sm font-semibold"
                  onPointerDown={() => {
                    if (!isRunning) return;
                    inputRef.current.left = true;
                  }}
                  onPointerUp={() => {
                    inputRef.current.left = false;
                  }}
                  onPointerLeave={() => {
                    inputRef.current.left = false;
                  }}
                  aria-label="Move left"
                >
                  Left
                </button>
                <button
                  type="button"
                  className="button-subtle px-4 py-2 text-sm font-semibold"
                  onClick={triggerJump}
                  aria-label="Jump"
                >
                  Jump
                </button>
                <button
                  type="button"
                  className="button-subtle px-4 py-2 text-sm font-semibold"
                  onPointerDown={() => {
                    if (!isRunning) return;
                    inputRef.current.right = true;
                  }}
                  onPointerUp={() => {
                    inputRef.current.right = false;
                  }}
                  onPointerLeave={() => {
                    inputRef.current.right = false;
                  }}
                  aria-label="Move right"
                >
                  Right
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
