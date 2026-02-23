import { useCallback, useEffect, useRef, useState } from "react";

type ObstacleKind = "tree" | "rock" | "stump" | "gate";

type Obstacle = {
  id: number;
  x: number;
  y: number;
  size: number;
  kind: ObstacleKind;
  drift: number;
  phase: number;
};

const UNLOCK_KEY = "skifree-easter-egg-unlocked";
const LEGACY_UNLOCK_KEY = "squamish-send-unlocked";
const PLAYER_Y = 78;
const PLAYER_HIT_X = 2.25;
const PLAYER_HIT_Y = 2.9;
const MIN_X = 8;
const MAX_X = 92;
const MIN_SPEED = 24;
const MAX_SPEED = 62;
const STEER_ACCEL = 170;
const STEER_DAMPING = 9.5;
const MAX_STEER_VELOCITY = 36;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function sampleObstacleKind(): ObstacleKind {
  const roll = Math.random();
  if (roll < 0.42) return "tree";
  if (roll < 0.68) return "rock";
  if (roll < 0.87) return "stump";
  return "gate";
}

function getObstacleSize(kind: ObstacleKind) {
  switch (kind) {
    case "tree":
      return randomBetween(4.6, 6.2);
    case "rock":
      return randomBetween(3.5, 5.2);
    case "stump":
      return randomBetween(3.1, 4.4);
    case "gate":
      return randomBetween(5.4, 7.4);
  }
}

function getObstacleHitbox(obstacle: Obstacle) {
  if (obstacle.kind === "tree")
    return { x: obstacle.size * 0.64, y: obstacle.size * 0.74 };
  if (obstacle.kind === "rock")
    return { x: obstacle.size * 0.74, y: obstacle.size * 0.58 };
  if (obstacle.kind === "stump")
    return { x: obstacle.size * 0.58, y: obstacle.size * 0.5 };
  return { x: obstacle.size * 0.2, y: obstacle.size * 0.6 };
}

function hasCollided(obstacle: Obstacle, playerX: number) {
  const yOverlap =
    Math.abs(obstacle.y - PLAYER_Y) < PLAYER_HIT_Y + obstacle.size * 0.6;
  if (!yOverlap) return false;

  if (obstacle.kind === "gate") {
    const postOffset = obstacle.size * 0.56;
    const postHit = obstacle.size * 0.22 + PLAYER_HIT_X;
    const leftHit = Math.abs(playerX - (obstacle.x - postOffset)) < postHit;
    const rightHit = Math.abs(playerX - (obstacle.x + postOffset)) < postHit;
    return leftHit || rightHit;
  }

  const hitbox = getObstacleHitbox(obstacle);
  const xOverlap = Math.abs(obstacle.x - playerX) < hitbox.x + PLAYER_HIT_X;
  const yHit = Math.abs(obstacle.y - PLAYER_Y) < hitbox.y + PLAYER_HIT_Y;
  return xOverlap && yHit;
}

function ObstacleSprite({ obstacle }: { obstacle: Obstacle }) {
  const dimension = obstacle.size * 7;

  if (obstacle.kind === "tree") {
    return (
      <svg
        viewBox="0 0 100 100"
        width={dimension}
        height={dimension}
        className="drop-shadow-[0_4px_4px_rgba(14,43,43,0.22)]"
      >
        <ellipse cx="50" cy="90" rx="24" ry="8" fill="rgba(16,37,55,0.15)" />
        <rect x="45" y="68" width="10" height="16" rx="2" fill="#5f4b32" />
        <polygon points="50,14 22,54 78,54" fill="#1d7461" />
        <polygon points="50,28 18,70 82,70" fill="#0f5b4c" />
      </svg>
    );
  }

  if (obstacle.kind === "rock") {
    return (
      <svg
        viewBox="0 0 100 100"
        width={dimension}
        height={dimension}
        className="drop-shadow-[0_4px_4px_rgba(16,37,55,0.22)]"
      >
        <ellipse cx="50" cy="86" rx="26" ry="8" fill="rgba(16,37,55,0.14)" />
        <path
          d="M22 70 L30 40 L50 30 L72 38 L79 62 L62 78 L36 80 Z"
          fill="#6f8497"
          stroke="#526578"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (obstacle.kind === "stump") {
    return (
      <svg
        viewBox="0 0 100 100"
        width={dimension}
        height={dimension}
        className="drop-shadow-[0_4px_4px_rgba(59,34,20,0.2)]"
      >
        <ellipse cx="50" cy="84" rx="22" ry="7" fill="rgba(16,37,55,0.12)" />
        <ellipse cx="50" cy="56" rx="23" ry="13" fill="#8e6b4f" />
        <rect x="27" y="56" width="46" height="24" rx="8" fill="#7a5a41" />
        <ellipse cx="50" cy="56" rx="13" ry="7" fill="#a58562" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 140 100"
      width={dimension * 1.4}
      height={dimension}
      className="drop-shadow-[0_4px_4px_rgba(16,37,55,0.18)]"
    >
      <ellipse cx="70" cy="86" rx="42" ry="7" fill="rgba(16,37,55,0.12)" />
      <rect x="28" y="34" width="9" height="48" rx="4" fill="#d84f54" />
      <rect x="103" y="34" width="9" height="48" rx="4" fill="#d84f54" />
      <rect
        x="34"
        y="39"
        width="74"
        height="7"
        rx="3"
        fill="#102537"
        opacity="0.85"
      />
      <rect
        x="38"
        y="41"
        width="66"
        height="3"
        rx="2"
        fill="#f3f7fb"
        opacity="0.8"
      />
    </svg>
  );
}

function SkierSprite({
  isJumping,
  carveLean,
}: {
  isJumping: boolean;
  carveLean: number;
}) {
  return (
    <div
      className="relative"
      style={{
        width: 54,
        height: 54,
        transform: `translateY(${isJumping ? -16 : 0}px) rotate(${carveLean * 15}deg) scale(${isJumping ? 1.06 : 1})`,
        transition: "transform 120ms ease-out",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="54"
        height="54"
        className="drop-shadow-[0_6px_6px_rgba(16,37,55,0.22)]"
      >
        <ellipse cx="50" cy="88" rx="22" ry="6" fill="rgba(16,37,55,0.12)" />
        <rect x="18" y="80" width="26" height="5" rx="2" fill="#204b71" />
        <rect x="56" y="80" width="26" height="5" rx="2" fill="#204b71" />
        <circle cx="50" cy="35" r="9" fill="#f5d0b5" />
        <path d="M38 48 L50 43 L62 48 L58 71 L42 71 Z" fill="#d84f54" />
        <rect x="44" y="56" width="12" height="23" rx="4" fill="#102537" />
        <rect x="39" y="48" width="8" height="18" rx="4" fill="#102537" />
        <rect x="53" y="48" width="8" height="18" rx="4" fill="#102537" />
      </svg>
    </div>
  );
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
  const [carveLean, setCarveLean] = useState(0);
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
  const steerVelocityRef = useRef(0);
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
      setStatus("Crash! Thread through gates and avoid solid obstacles.");
    } else {
      setStatus("Run ended.");
    }
  };

  const spawnObstacle = () => {
    const kind = sampleObstacleKind();
    const size = getObstacleSize(kind);

    let attempts = 0;
    let x = randomBetween(MIN_X + size * 0.18, MAX_X - size * 0.18);
    while (attempts < 5) {
      const overlapsSpawn = obstaclesRef.current.some(
        (obstacle) =>
          obstacle.y > 92 &&
          Math.abs(obstacle.x - x) < obstacle.size * 0.55 + size * 0.55 + 1.8,
      );
      if (!overlapsSpawn) break;
      x = randomBetween(MIN_X + size * 0.18, MAX_X - size * 0.18);
      attempts += 1;
    }

    obstaclesRef.current = [
      ...obstaclesRef.current,
      {
        id: obstacleIdRef.current,
        x,
        y: 112,
        size,
        kind,
        drift: randomBetween(-3.5, 3.5),
        phase: randomBetween(0, Math.PI * 2),
      },
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
    setCarveLean(0);
    setObstacles([]);

    playerXRef.current = 50;
    steerVelocityRef.current = 0;
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

      const steerIntent =
        (inputRef.current.left ? -1 : 0) + (inputRef.current.right ? 1 : 0);

      steerVelocityRef.current += steerIntent * STEER_ACCEL * dt;
      if (steerIntent === 0) {
        steerVelocityRef.current *= Math.exp(-STEER_DAMPING * dt);
      }
      steerVelocityRef.current = clamp(
        steerVelocityRef.current,
        -MAX_STEER_VELOCITY,
        MAX_STEER_VELOCITY,
      );

      playerXRef.current += steerVelocityRef.current * dt;
      if (playerXRef.current < MIN_X || playerXRef.current > MAX_X) {
        playerXRef.current = clamp(playerXRef.current, MIN_X, MAX_X);
        steerVelocityRef.current *= -0.2;
      }

      speedRef.current = clamp(
        speedRef.current +
          (4.2 - Math.abs(steerVelocityRef.current) * 0.06) * dt,
        MIN_SPEED,
        MAX_SPEED,
      );

      scoreRef.current += speedRef.current * dt * 9.2;
      spawnElapsedRef.current += dt;

      const spawnInterval = clamp(0.7 - speedRef.current * 0.0076, 0.18, 0.68);
      while (spawnElapsedRef.current >= spawnInterval) {
        spawnElapsedRef.current -= spawnInterval;
        spawnObstacle();
      }

      obstaclesRef.current = obstaclesRef.current
        .map((obstacle) => ({
          ...obstacle,
          y: obstacle.y - speedRef.current * dt,
          x: clamp(
            obstacle.x +
              Math.sin(time * 0.0012 + obstacle.phase) * obstacle.drift * dt,
            MIN_X,
            MAX_X,
          ),
        }))
        .filter((obstacle) => obstacle.y > -18);

      const jumping = time < jumpUntilRef.current;
      if (jumping !== jumpActiveRef.current) {
        jumpActiveRef.current = jumping;
        setIsJumping(jumping);
        if (!jumping) setStatus("Carving.");
      }

      if (!jumping) {
        const hitObstacle = obstaclesRef.current.some((obstacle) =>
          hasCollided(obstacle, playerXRef.current),
        );

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
      }

      const liveScore = Math.floor(scoreRef.current);
      const leanTarget = clamp(
        steerVelocityRef.current / MAX_STEER_VELOCITY,
        -1,
        1,
      );
      setScore(liveScore);
      setBestScore((prev) => Math.max(prev, liveScore));
      setSpeed(speedRef.current);
      setPlayerX(playerXRef.current);
      setCarveLean(leanTarget);
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
        aria-label="Open Squamish Skiing mini-game"
      >
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden>
          <path d="M3 16 L8 6 L12 11 L16 4 L17.5 16 Z" fill="#1d7461" />
          <path
            d="M2 16 H18"
            stroke="#102537"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
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
                  Squamish Skiing
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
                aria-label="Close Squamish Skiing mini-game"
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
              <div className="relative h-[390px] overflow-hidden rounded-xl border border-border-muted bg-[radial-gradient(circle_at_18%_9%,#ffffff_0%,#eef4fa_35%,#d9e4ef_100%)]">
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.4),rgba(16,37,55,0.07))]" />
                <div
                  className="absolute inset-0 opacity-35 [background-image:linear-gradient(120deg,rgba(255,255,255,0.85)_1px,transparent_1px)] [background-size:26px_26px]"
                  style={{ backgroundPosition: `0 ${score % 26}px` }}
                />
                <div
                  className="absolute inset-x-0 top-0 h-full opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, rgba(16,37,55,0.07) 0%, rgba(16,37,55,0.03) 25%, transparent 55%)",
                  }}
                />

                {obstacles.map((obstacle) => (
                  <div
                    key={obstacle.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${obstacle.x}%`, top: `${obstacle.y}%` }}
                    aria-hidden
                  >
                    <ObstacleSprite obstacle={obstacle} />
                  </div>
                ))}

                <div
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${playerX}%`, top: `${PLAYER_Y}%` }}
                  aria-hidden
                >
                  <SkierSprite isJumping={isJumping} carveLean={carveLean} />
                </div>

                {!isRunning && !hasCrashed ? (
                  <div className="absolute inset-x-4 top-4 rounded-lg border border-border-muted/80 bg-bg-default/85 px-3 py-2 text-sm text-text-primary">
                    Use keyboard or tap controls below to dodge obstacles and
                    thread gates.
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
                    aria-label="Restart Squamish Skiing mini-game"
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
                  onPointerCancel={() => {
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
                  onPointerCancel={() => {
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
