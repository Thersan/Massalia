"use client";

import { useState } from "react";
import { formatEuro } from "@/lib/format";

type Point = { month: string; label: string; amount: number };

export default function RevenueChart({ data }: { data: Point[] }) {
  const [active, setActive] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-sm text-stone ring-1 ring-sand">
        Pas encore de revenus à afficher.
      </p>
    );
  }

  // Repère du dessin (coordonnées internes du SVG, mises à l'échelle responsive).
  const W = 720;
  const H = 260;
  const padX = 28;
  const padTop = 24;
  const padBottom = 44;
  const plotW = W - padX * 2;
  const plotH = H - padTop - padBottom;
  const baseY = padTop + plotH;

  const max = Math.max(...data.map((d) => d.amount));
  const total = data.reduce((sum, d) => sum + d.amount, 0);

  const x = (i: number) =>
    data.length === 1 ? W / 2 : padX + (i / (data.length - 1)) * plotW;
  const y = (amount: number) =>
    baseY - (max === 0 ? 0 : (amount / max) * plotH);

  const points = data.map((d, i) => ({ ...d, px: x(i), py: y(d.amount) }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.px} ${p.py}`)
    .join(" ");
  const areaPath =
    `M ${points[0].px} ${baseY} ` +
    points.map((p) => `L ${p.px} ${p.py}`).join(" ") +
    ` L ${points[points.length - 1].px} ${baseY} Z`;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sand">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-wide text-stone">
          Total sur la période
        </span>
        <span className="text-lg font-semibold text-ink">
          {formatEuro(total)}
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Revenus par mois"
        >
          <defs>
            <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1b6ca8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1b6ca8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* lignes de repère horizontales */}
          {[0, 0.5, 1].map((t) => (
            <line
              key={t}
              x1={padX}
              x2={W - padX}
              y1={padTop + plotH * t}
              y2={padTop + plotH * t}
              stroke="#f4ede3"
              strokeWidth="1"
            />
          ))}

          <path d={areaPath} fill="url(#revFill)" />
          <path
            d={linePath}
            fill="none"
            stroke="#1b6ca8"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* repère vertical au survol */}
          {active !== null && (
            <line
              x1={points[active].px}
              x2={points[active].px}
              y1={padTop}
              y2={baseY}
              stroke="#1b6ca8"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
          )}

          {/* points */}
          {points.map((p, i) => (
            <circle
              key={p.month}
              cx={p.px}
              cy={p.py}
              r={active === i ? 6 : 4}
              fill="#fff"
              stroke="#1b6ca8"
              strokeWidth="2.5"
            />
          ))}

          {/* libellés des mois */}
          {points.map((p) => (
            <text
              key={p.month}
              x={p.px}
              y={H - 14}
              textAnchor="middle"
              fontSize="13"
              fill="#6b635a"
              className="capitalize"
            >
              {p.label}
            </text>
          ))}

          {/* zones de survol (une colonne par mois) */}
          {points.map((p, i) => {
            const w = plotW / data.length;
            return (
              <rect
                key={p.month}
                x={p.px - w / 2}
                y={0}
                width={w}
                height={H}
                fill="transparent"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              />
            );
          })}
        </svg>

        {/* infobulle */}
        {active !== null && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-ink px-3 py-2 text-center shadow-lg"
            style={{
              left: `${(points[active].px / W) * 100}%`,
              top: `${(points[active].py / H) * 100}%`,
              marginTop: "-14px",
            }}
          >
            <div className="text-[0.7rem] uppercase tracking-wide capitalize text-white/60">
              {points[active].label}
            </div>
            <div className="text-sm font-semibold text-white">
              {formatEuro(points[active].amount)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
