import { useCallback, useEffect, useRef, useState } from "react";
import {
  ARM,
  DT,
  GRIP_TIME,
  H,
  HAND,
  MILESTONES,
  PX_PER_M,
  START_Y,
  SUMMIT_M,
  SUMMIT_Y,
  W,
  bodyAt,
  heightNow,
  isOver,
  newGame,
  step,
  type Game,
  type Hold,
  type HoldType,
  type Vec,
} from "./climb/engine";

// Squamish Dyno: a one-button climbing game up the Stawamus Chief.
// Hold to swing, let go to jump, catch the next hold before your grip fades.

type Hud = { height: number; falls: number; time: number; message: string };
type Result = {
  time: number;
  falls: number;
  best: number | null;
  newBest: boolean;
};

const BEST_KEY = "squamish-dyno-best";
const HOLD_COLORS: Record<HoldType, string> = {
  start: "#6b7c8a",
  bolt: "#9aa7b2",
  jug: "#3f8f5a",
  crimp: "#2f5877",
  sloper: "#d66f3d",
  summit: "#e0b43a",
};

const hash = (a: number, b: number) => {
  const n = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

function readBest(): number | null {
  const v = Number(window.localStorage.getItem(BEST_KEY));
  return Number.isFinite(v) && v > 0 ? v : null;
}

function drawWall(ctx: CanvasRenderingContext2D, g: Game) {
  const sy = (y: number) => H - (y - g.cam);

  const rock = ctx.createLinearGradient(0, 0, 0, H);
  rock.addColorStop(0, "#d3dbe2");
  rock.addColorStop(1, "#b3bec8");
  ctx.fillStyle = rock;
  ctx.fillRect(0, 0, W, H);

  // Granite speckle, anchored to the wall so it scrolls.
  const y0 = Math.floor(g.cam / 28) * 28;
  for (let wy = y0; wy < g.cam + H + 28; wy += 28) {
    for (let wx = 0; wx < W; wx += 28) {
      const r = hash(wx, wy);
      ctx.fillStyle = r > 0.5 ? "rgba(255,255,255,0.4)" : "rgba(40,55,70,0.14)";
      const s = 1.5 + r * 2.5;
      ctx.fillRect(wx + r * 24, sy(wy) - hash(wy, wx) * 24, s, s);
    }
  }

  // Two long crack systems.
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const [base, a, b] of [
    [100, 150, 53],
    [385, 200, 67],
  ]) {
    ctx.strokeStyle = "rgba(40,55,70,0.28)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let s = -20; s <= H + 20; s += 14) {
      const wy = g.cam + H - s;
      const x = base + 38 * Math.sin(wy / a) + 14 * Math.sin(wy / b);
      if (s === -20) ctx.moveTo(x, s);
      else ctx.lineTo(x, s);
    }
    ctx.stroke();
  }

  // Sky and skyline above the summit.
  const edge = sy(SUMMIT_Y + 30);
  if (edge > 0) {
    const sky = ctx.createLinearGradient(0, 0, 0, edge);
    sky.addColorStop(0, "#7fc1ec");
    sky.addColorStop(1, "#e2f2fc");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, edge);
    ctx.fillStyle = "#8795a1";
    ctx.beginPath();
    ctx.moveTo(0, edge);
    for (let x = 0; x <= W; x += 40) ctx.lineTo(x, edge - 10 - 18 * hash(x, 1));
    ctx.lineTo(W, edge + 4);
    ctx.lineTo(0, edge + 4);
    ctx.fill();
    ctx.fillStyle = "#b3bec8";
    ctx.fillRect(0, edge, W, 6);
  }

  // Milestone lines.
  ctx.font = "600 13px 'Avenir Next', 'Segoe UI', sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  for (const [m, label] of MILESTONES) {
    if (m === SUMMIT_M) continue;
    const s = sy(START_Y + m * PX_PER_M);
    if (s < -20 || s > H + 20) continue;
    ctx.strokeStyle = "rgba(31,63,88,0.3)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(0, s);
    ctx.lineTo(W, s);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(31,63,88,0.7)";
    ctx.fillText(`${label} · ${m} m`, W - 10, s - 6);
  }

  // Forest at the base.
  const ground = sy(0);
  if (ground < H + 90) {
    ctx.fillStyle = "#35604a";
    ctx.fillRect(0, ground, W, Math.max(0, H - ground) + 10);
    for (let x = -10; x < W + 20; x += 24) {
      const t = 45 + hash(x, 3) * 50;
      ctx.fillStyle = hash(x, 7) > 0.5 ? "#2b4f3b" : "#3e6c51";
      ctx.beginPath();
      ctx.moveTo(x - 15, ground + 8);
      ctx.lineTo(x, ground - t);
      ctx.lineTo(x + 15, ground + 8);
      ctx.fill();
    }
  }
}

function drawHold(ctx: CanvasRenderingContext2D, h: Hold, s: number) {
  const spent = h.grip <= 0;
  ctx.globalAlpha = spent ? 0.35 : 1;
  ctx.fillStyle = HOLD_COLORS[h.type];
  ctx.strokeStyle = "rgba(16,37,55,0.35)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  switch (h.type) {
    case "jug":
      ctx.ellipse(h.x, s, 16, 11, 0, 0, Math.PI * 2);
      break;
    case "crimp":
      ctx.roundRect(h.x - 15, s - 5, 30, 10, 4);
      break;
    case "sloper":
      ctx.ellipse(h.x, s + 2, 17, 9, 0, Math.PI, 0);
      ctx.closePath();
      break;
    case "summit":
      ctx.moveTo(h.x, s - 16);
      ctx.lineTo(h.x + 14, s + 8);
      ctx.lineTo(h.x - 14, s + 8);
      ctx.closePath();
      break;
    default: // start, bolt: steel hanger
      ctx.arc(h.x, s, 8, 0, Math.PI * 2);
      ctx.moveTo(h.x + 4, s);
      ctx.arc(h.x, s, 4, 0, Math.PI * 2, true);
  }
  ctx.fill("evenodd");
  ctx.stroke();

  if (h.type === "summit") {
    ctx.strokeStyle = "#1f3f58";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(h.x, s - 16);
    ctx.lineTo(h.x, s - 44);
    ctx.stroke();
    ctx.fillStyle = "#d66f3d";
    ctx.beginPath();
    ctx.moveTo(h.x, s - 44);
    ctx.lineTo(h.x + 20, s - 38);
    ctx.lineTo(h.x, s - 32);
    ctx.fill();
  }

  // Grip ring: shows how much of the hold is left.
  const full = GRIP_TIME[h.type];
  if (Number.isFinite(full) && h.grip < full && !spent) {
    const frac = h.grip / full;
    ctx.strokeStyle = frac < 0.3 ? "#e0463a" : "rgba(31,63,88,0.8)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(h.x, s, 22, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function limb(ctx: CanvasRenderingContext2D, pts: Vec[], width: number) {
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (const p of pts.slice(1)) ctx.lineTo(p.x, p.y);
  ctx.stroke();
}

function drawClimber(ctx: CanvasRenderingContext2D, g: Game, now: number) {
  const sy = (y: number) => H - (y - g.cam);
  const hanging = g.phase === "hanging" || g.phase === "summit";
  const body = hanging ? bodyAt(g.hold, g.theta) : g.pos;
  const c = { x: body.x, y: sy(body.y) };

  // Unit vector from body towards the hand (up the arm), in screen space.
  let ux = 0;
  let uy = -1;
  if (hanging) {
    ux = (g.hold.x - body.x) / ARM;
    uy = -(g.hold.y - body.y) / ARM;
  }
  const px = -uy; // perpendicular: climber's right
  const py = ux;
  const hand = hanging
    ? { x: g.hold.x, y: sy(g.hold.y) }
    : { x: c.x + 6, y: c.y - HAND };
  // Shoulder sits off to one side so the arm and head read separately.
  const shoulder = { x: c.x + ux * 16 + px * 7, y: c.y + uy * 16 + py * 7 };
  const neck = { x: c.x + ux * 16, y: c.y + uy * 16 };
  const hip = { x: c.x - ux * 16, y: c.y - uy * 16 };
  const head = {
    x: neck.x + ux * 11 - px * 5,
    y: neck.y + uy * 11 - py * 5,
  };
  const flying = g.phase === "flying" || g.phase === "falling";
  const kick = Math.sin(now / 150) * (flying ? 9 : 3);

  // Rope back to the last clipped bolt.
  const anchor = g.checkpoint;
  if (anchor.type === "bolt") {
    ctx.strokeStyle = "rgba(214,111,61,0.85)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(anchor.x, sy(anchor.y));
    ctx.quadraticCurveTo(
      (anchor.x + hip.x) / 2 + 12,
      (sy(anchor.y) + hip.y) / 2 + 30,
      hip.x,
      hip.y,
    );
    ctx.stroke();
  }

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  // Pale outline first so the figure stands out from rock and trees.
  const pass = (outline: boolean) => {
    const w = outline ? 4 : 0;
    ctx.strokeStyle = outline ? "rgba(255,255,255,0.85)" : "#1f3f58";
    // legs
    for (const side of [-1, 1]) {
      const knee = {
        x: hip.x - ux * 15 + px * side * 7 + side * kick * 0.4,
        y: hip.y - uy * 15 + py * side * 7,
      };
      const foot = {
        x: knee.x - ux * 15 + px * side * 3 - side * kick,
        y: knee.y - uy * 15 + py * side * 3,
      };
      limb(ctx, [hip, knee, foot], 6 + w);
    }
    // torso
    ctx.strokeStyle = outline ? "rgba(255,255,255,0.85)" : "#2f5877";
    limb(ctx, [neck, hip], 12 + w);
    // free arm, bent, reaching out
    ctx.strokeStyle = outline ? "rgba(255,255,255,0.85)" : "#1f3f58";
    const elbow = {
      x: neck.x - px * 13 - ux * 4,
      y: neck.y - py * 13 - uy * 4,
    };
    const free = flying
      ? { x: elbow.x - px * 4 + ux * 12, y: elbow.y - py * 4 + uy * 12 }
      : { x: elbow.x - px * 9 + ux * 4, y: elbow.y - py * 9 + uy * 4 };
    limb(ctx, [neck, elbow, free], 5 + w);
    // gripping arm
    limb(ctx, [shoulder, hand], 6 + w);
  };
  pass(true);
  pass(false);

  // Hand on the hold.
  ctx.fillStyle = "#f2c9a8";
  ctx.beginPath();
  ctx.arc(hand.x, hand.y, 4.5, 0, Math.PI * 2);
  ctx.fill();
  // Chalk bag.
  ctx.fillStyle = "#d66f3d";
  ctx.beginPath();
  ctx.arc(hip.x - px * 8, hip.y - py * 8, 4.5, 0, Math.PI * 2);
  ctx.fill();
  // Head + helmet.
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(head.x, head.y, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f2c9a8";
  ctx.beginPath();
  ctx.arc(head.x, head.y, 9, 0, Math.PI * 2);
  ctx.fill();
  const up = Math.atan2(uy, ux);
  ctx.fillStyle = "#d66f3d";
  ctx.beginPath();
  ctx.arc(head.x, head.y, 10, up - Math.PI / 2, up + Math.PI / 2);
  ctx.closePath();
  ctx.fill();
}

function drawRain(ctx: CanvasRenderingContext2D, g: Game, now: number) {
  if (g.rain <= 0) return;
  const a = Math.min(1, g.rain, 8 - g.rain);
  ctx.fillStyle = `rgba(60,90,120,${0.12 * a})`;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = `rgba(230,240,250,${0.55 * a})`;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i < 70; i++) {
    const x = (hash(i, 1) * W + now * 0.05) % W;
    const y = (hash(i, 2) * H + now * 0.9) % H;
    ctx.moveTo(x, y);
    ctx.lineTo(x - 3, y + 12);
  }
  ctx.stroke();
}

function draw(ctx: CanvasRenderingContext2D, g: Game, now: number) {
  const sy = (y: number) => H - (y - g.cam);
  drawWall(ctx, g);
  for (const h of g.holds) {
    const s = sy(h.y);
    if (s > -60 && s < H + 30) drawHold(ctx, h, s);
  }
  drawClimber(ctx, g, now);
  drawRain(ctx, g, now);

  // Swing hint for new players.
  if (!g.started) {
    ctx.fillStyle = "rgba(16,37,55,0.75)";
    ctx.font = "600 15px 'Avenir Next', 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      g.pressed ? "Now let go near the top of the swing!" : "Hold to swing ↔",
      W / 2,
      sy(g.hold.y) - 36,
    );
  }
}

const fmtTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m ? `${m}:${String(sec).padStart(2, "0")}` : `${s.toFixed(1)}s`;
};

export default function ClimbGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  if (gameRef.current === null) gameRef.current = newGame();
  const [hud, setHud] = useState<Hud>({
    height: 0,
    falls: 0,
    time: 0,
    message: "Hold Space (or press and hold) to swing. Let go to jump.",
  });
  const [result, setResult] = useState<Result | null>(null);
  const [best, setBest] = useState<number | null>(readBest);

  const restart = useCallback(() => {
    gameRef.current = newGame();
    setResult(null);
    canvasRef.current?.focus();
  }, []);

  const setPressed = (on: boolean) => {
    if (gameRef.current) gameRef.current.pressed = on;
  };

  // Game loop with a fixed physics step.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.focus();

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let hudAt = 0;
    let finished: Game | null = null;
    const frame = (now: number) => {
      const g = gameRef.current;
      if (!g) return;
      acc += Math.min(0.1, (now - last) / 1000);
      last = now;
      while (acc >= DT) {
        step(g, DT);
        acc -= DT;
      }
      draw(ctx, g, now);
      if (now - hudAt > 100) {
        hudAt = now;
        setHud({
          height: heightNow(g),
          falls: g.falls,
          time: g.elapsed,
          message: g.message,
        });
      }
      if (isOver(g) && finished !== g) {
        finished = g;
        const prev = readBest();
        const newBest = prev === null || g.elapsed < prev;
        if (newBest)
          window.localStorage.setItem(BEST_KEY, g.elapsed.toFixed(2));
        setBest(newBest ? g.elapsed : prev);
        setResult({ time: g.elapsed, falls: g.falls, best: prev, newBest });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Keyboard: Space / ↑ / Enter to swing, release to jump.
  useEffect(() => {
    const isSwingKey = (e: KeyboardEvent) =>
      e.key === " " || e.key === "ArrowUp" || e.key === "Enter";
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (!isSwingKey(e)) return;
      e.preventDefault();
      if (e.repeat) return;
      const g = gameRef.current;
      if (g && isOver(g)) restart();
      else setPressed(true);
    };
    const up = (e: KeyboardEvent) => {
      if (!isSwingKey(e)) return;
      e.preventDefault();
      setPressed(false);
    };
    const blur = () => setPressed(false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, [onClose, restart]);

  // Lock page scroll while open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const heightPct = Math.min(100, (hud.height / SUMMIT_M) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-2 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="squamish-dyno-title"
    >
      <div className="content-card flex max-h-full w-full max-w-[520px] flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border-muted/80 px-4 py-2">
          <div>
            <h2
              id="squamish-dyno-title"
              className="text-lg font-semibold text-text-primary"
            >
              Squamish Dyno 🧗
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="button-subtle px-3 py-1.5 text-xs font-semibold tracking-wide uppercase"
            aria-label="Close Squamish Dyno"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 border-b border-border-muted/80 bg-bg-default/70 px-4 py-2 text-center">
          <div>
            <p className="text-[0.65rem] tracking-wide text-text-muted uppercase">
              Height
            </p>
            <p className="font-semibold text-text-primary tabular-nums">
              {hud.height.toFixed(0)} / {SUMMIT_M} m
            </p>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white">
              <div
                className="h-full bg-accent"
                style={{ width: `${heightPct}%` }}
              />
            </div>
          </div>
          <div>
            <p className="text-[0.65rem] tracking-wide text-text-muted uppercase">
              Time · Falls
            </p>
            <p className="font-semibold text-text-primary tabular-nums">
              {fmtTime(hud.time)} · {hud.falls}
            </p>
          </div>
          <div>
            <p className="text-[0.65rem] tracking-wide text-text-muted uppercase">
              Best
            </p>
            <p className="font-semibold text-text-primary tabular-nums">
              {best === null ? "—" : fmtTime(best)}
            </p>
          </div>
        </div>

        <div className="relative flex justify-center bg-white p-2">
          <canvas
            ref={canvasRef}
            tabIndex={0}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setPressed(true);
            }}
            onPointerUp={() => setPressed(false)}
            onPointerCancel={() => setPressed(false)}
            onContextMenu={(e) => e.preventDefault()}
            aria-label="Climbing wall. Hold Space or press to swing, release to jump."
            className="block touch-none rounded-lg outline-none select-none"
            style={{
              width: "min(100%, calc((100dvh - 230px) * 0.75), 480px)",
              aspectRatio: "3 / 4",
              WebkitTouchCallout: "none",
            }}
          />
          {result ? (
            <div className="absolute inset-x-6 top-1/4 rounded-xl border border-border-muted bg-white/95 p-5 text-center shadow-lg">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                {result.newBest ? "New best! 🏔️" : "Summit! 🏔️"}
              </p>
              <p className="mt-2 text-text-primary">
                You sent the Chief in <strong>{fmtTime(result.time)}</strong>{" "}
                with{" "}
                <strong>
                  {result.falls} {result.falls === 1 ? "fall" : "falls"}
                </strong>
                .
              </p>
              {result.best !== null && !result.newBest ? (
                <p className="mt-1 text-sm text-text-muted">
                  Best: {fmtTime(result.best)}
                </p>
              ) : null}
              <button
                type="button"
                onClick={restart}
                className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light"
              >
                Climb again
              </button>
              <p className="mt-2 text-xs text-text-muted">or press Space</p>
            </div>
          ) : null}
        </div>

        <div className="border-t border-border-muted/80 px-4 py-1.5 text-xs text-text-muted">
          <p
            className="min-h-[1.25rem] text-sm font-medium text-text-primary"
            aria-live="polite"
          >
            {hud.message}
          </p>
          <p className="mt-0.5 hidden sm:block">
            <span style={{ color: HOLD_COLORS.jug }}>●</span> jugs last longest
            · <span style={{ color: HOLD_COLORS.crimp }}>●</span> crimps ·{" "}
            <span style={{ color: HOLD_COLORS.sloper }}>●</span> slopers fade
            fast · bolts catch your falls
          </p>
        </div>
      </div>
    </div>
  );
}
