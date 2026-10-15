"use client";

import CountUp from "react-countup";

// Animates a statistic from 0 to `value` once it scrolls into view.
// Uses react-countup's built-in scroll spy; no extra dependencies.
export default function StatCounter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  return (
    <span className={className}>
      <CountUp
        end={value}
        duration={1.2}
        separator=""
        suffix={suffix}
        enableScrollSpy
        scrollSpyOnce
      />
    </span>
  );
}
