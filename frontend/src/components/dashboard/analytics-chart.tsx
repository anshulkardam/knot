"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "Jan 1", clicks: 120 },
  { date: "Jan 2", clicks: 180 },
  { date: "Jan 3", clicks: 150 },
  { date: "Jan 4", clicks: 280 },
  { date: "Jan 5", clicks: 320 },
  { date: "Jan 6", clicks: 250 },
  { date: "Jan 7", clicks: 400 },
  { date: "Jan 8", clicks: 380 },
  { date: "Jan 9", clicks: 420 },
  { date: "Jan 10", clicks: 350 },
  { date: "Jan 11", clicks: 480 },
  { date: "Jan 12", clicks: 520 },
  { date: "Jan 13", clicks: 450 },
  { date: "Jan 14", clicks: 580 },
];

const PRIMARY = "#6366f1"; // indigo-500
const MUTED = "#9ca3af";   // gray-400
const GRID = "#1f2933";    // subtle dark border

export function AnalyticsChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.35} />
              <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: MUTED, fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: MUTED, fontSize: 12 }}
            dx={-10}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: `1px solid ${GRID}`,
              borderRadius: 8,
            }}
            labelStyle={{ color: "#e5e7eb" }}
            itemStyle={{ color: "#e5e7eb" }}
          />

          <Area
            type="natural"
            dataKey="clicks"
            stroke={PRIMARY}
            strokeWidth={2}
            fill="url(#clicksGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
